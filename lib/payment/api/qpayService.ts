import { prisma } from "@api/prisma";
import { appRoot } from "@util/config";
import { AppError } from "@util/errors";
import fetch from "cross-fetch";

export const createInvoiceOnEdental = async (
  userId: string,
  productVariantId: string
) => {
  let productVariant = await prisma.productVariant.findUnique({
    where: {
      id: productVariantId,
    },
  });

  if (!productVariant) return AppError.NotFound("Payment plan not found");

  //create new invoice
  const invoice = await prisma.qPayInvoice.create({
    data: {
      productVariantId: productVariantId,
      productId: productVariant.productId,
      userId,
    },
    select: {
      id: true,
      user: {
        select: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  const newInvoce: any = {
    invoice_code: process.env.QPAY_INVOICE_CODE,
    sender_invoice_no: invoice.id,
    invoice_receiver_code: "83",
    sender_branch_code: "EDENTAL_APP",
    invoice_description: productVariant.name,
    enable_expiry: "false",
    allow_partial: false,
    minimum_amount: null,
    allow_exceed: false,
    maximum_amount: null,
    amount: productVariant.price,
    callback_url: `${appRoot}/api/payments/qpay/callback?payment_id=${invoice.id}`,
    sender_staff_code: "online",
    note: null,
    invoice_receiver_data: {
      register: "TT969696",
      name:
        invoice.user?.profile?.firstName +
        " " +
        invoice.user?.profile?.lastName, //real name
      email: "head@edental.mn",
      phone: "80454011",
    },
    lines: [
      {
        tax_product_code: "6401",
        line_description: productVariant.name,
        line_quantity: "1.00",
        line_unit_price: productVariant.price,
        note: productVariant.name,
        discounts: [
          {
            discount_code: "NONE",
            description: " discounts",
            amount: 10,
            note: " discounts",
          },
        ],
        surcharges: [
          {
            surcharge_code: "NONE",
            description: "Хүргэлтийн зардал",
            amount: 10,
            note: " Хүргэлт",
          },
        ],
        taxes: [
          {
            tax_code: "VAT",
            description: "НӨАТ",
            amount: 0,
            note: " НӨАТ",
          },
        ],
      },
    ],
  };

  await prisma.qPayInvoice.update({
    where: {
      id: invoice.id,
    },
    data: {
      invoiceData: newInvoce,
    },
  });
  const qpayInvoice = await createInvoiceOnQPay(newInvoce);
  console.log(qpayInvoice);
  return qpayInvoice;
};
export const createInvoiceOnQPay = async (invoice: any) => {
  const access_token = await getQPayToken();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${access_token}`);

  var raw = JSON.stringify(invoice);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return await fetch("https://merchant.qpay.mn/v2/invoice", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
export const getQPayToken = async () => {
  var myHeaders = new Headers();
  myHeaders.append(`Authorization`, `Basic ${process.env.QPAY_BASIC_TOKEN}`);

  var raw = "";

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const qpayResult = fetch(
    "https://merchant.qpay.mn/v2/auth/token",
    requestOptions
  )
    .then((response) => response.json())
    .then((result: any) => {
      return result.access_token;
    })
    .catch((error) => error);
  return qpayResult;
};
//qpayInvoice table id
export const callPaymentCompletion = async (paymentId: string) => {
  const invoice = await prisma.qPayInvoice.findUnique({
    where: {
      id: paymentId,
    },
  });
  if (!invoice || !invoice.userId) return {};

  const EDENTALQPayInvoice = await prisma.qPayInvoice.update({
    where: {
      id: invoice.id,
    },
    data: {
      payedDate: new Date(),
    },
    select: {
      invoiceData: true,
    },
  });

  return {};
};
