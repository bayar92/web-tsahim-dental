import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function AddProduct() {
  const products = [
    {
      name: "Дотоод сүлжээнд",
      productDescription: {
        items: [
          "Үйлчлүүлэгчийн бүртгэл",
          "Цаг захиалга",
          "Үзлэг, эмчилгээний тэмдэглэл",
          "Автомат мессеж явуулах тохиргоо",
          "Рентген аппаратанд холбогдох",
          "Статистик мэдээлэл",
          "Кассын мэдээлэл",
          "Эргэн сануулах үйлчилгээ",
          "Эмийн жор гаргах",
          "Үйлчлүүлэгчийг ухаалгаар менеж хийх",
          "НӨАТ-н баримт хэвлэх",
          "Лаборатори захиалгын мэдээлэл",
        ],
      },
      productVariant: [
        {
          name: "Дотоод сүлжээнд, 1 сар, 1-3 кресл",
          price: 190000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 3,
        },
        {
          name: "Дотоод сүлжээнд, 1 сар, 4-5 кресл",
          price: 240000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 5,
        },
        {
          name: "Дотоод сүлжээнд, 1 сар, 6-10 кресл",
          price: 290000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 10,
        },
        {
          name: "Дотоод сүлжээнд, 6 сар, 1-3 кресл",
          price: 1026000,
          discount: 114000,
          duration: 180,
          unit: 6,
          sits: 3,
        },
        {
          name: "Дотоод сүлжээнд, 6 сар, 4-5 кресл",
          price: 1296000,
          discount: 144000,
          duration: 180,
          unit: 6,
          sits: 5,
        },
        {
          name: "Дотоод сүлжээнд, 6 сар, 6-10 кресл",
          price: 1566000,
          discount: 174000,
          duration: 180,
          unit: 6,
          sits: 10,
        },
      ],
    },
    {
      name: "Интернэт сүлжээнд",
      productDescription: {
        items: [
          "Үйлчлүүлэгчийн бүртгэл",
          "Цаг захиалга",
          "Үзлэг, эмчилгээний тэмдэглэл",
          "Автомат мессеж явуулах тохиргоо",
          "Рентген аппаратанд холбогдох",
          "Статистик мэдээлэл",
          "Кассын мэдээлэл",
          "Эргэн сануулах үйлчилгээ",
          "Эмийн жор гаргах",
          "Үйлчлүүлэгчийг ухаалгаар менеж хийх",
          "НӨАТ-н баримт хэвлэх",
          "Лаборатори захиалгын мэдээлэл",
          "Өдөр болгоны өөрчлөлтийг хадгалах",
          "Олон салбар дундаа мэдээлэл солилцох",
          "Эмч цаг захиалгыг хүссэн газраасаа харах",
          "Таблет дээр үйлчлүүлэгчээс гарын үсэг авах",
        ],
      },
      productVariant: [
        {
          name: "Интернэт Орчинд, 1 сар, 1-3 кресл",
          price: 290000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 3,
        },
        {
          name: "Интернэт Орчинд, 1 сар, 4-5 кресл",
          price: 390000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 5,
        },
        {
          name: "Интернэт Орчинд, 1 сар, 6-10 кресл",
          price: 490000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 10,
        },
        {
          name: "Интернэт Орчинд, 6 сар, 1-3 кресл",
          price: 1566000,
          discount: 174000,
          duration: 180,
          unit: 6,
          sits: 3,
        },
        {
          name: "Интернэт Орчинд, 6 сар, 4-5 кресл",
          price: 2106000,
          discount: 234000,
          duration: 180,
          unit: 6,
          sits: 5,
        },
        {
          name: "Интернэт Орчинд, 6 сар, 6-10 кресл",
          price: 2646000,
          discount: 294000,
          duration: 180,
          unit: 6,
          sits: 10,
        },
      ],
    },
    {
      name: "Өдөр болгоны дата Cloud-руу хадгалах",
      productDescription: {
        items: ["Өдөр болгоны дата Cloud-руу хадгалах"],
      },
      productVariant: [
        {
          name: "Өдөр болгоны дата Cloud-руу хадгалах, 1 сар",
          price: 20000,
          discount: 0,
          duration: 30,
          unit: 1,
          sits: 3,
        },
      ],
    },
  ];
  for (const product of products) {
    var newProduct = await prisma.product.create({
      data: {
        name: product.name,
        productDescription: product.productDescription,
      },
    });
    for (const variant of product.productVariant) {
      await prisma.productVariant.create({
        data: {
          ...variant,
          productId: newProduct.id,
        },
      });
    }
  }
}
//add products in database
addUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });
async function addUsers() {
  const users = [
    {
      email: "head@edental.mn",
      phoneNumber: "80454011",
      password: "Pass1234!",
      role: UserRole.ADMIN,
      hospital: {
        name: "edental",
        phoneNumber: "99993333",
        subDomain: "eedental",
      },
    },
    {
      email: "marka@edental.mn",
      phoneNumber: "88109008",
      password: "Pass1234!",
      role: UserRole.ADMIN,
    },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        passwordDigest: await bcrypt.hash(user.password, 10),
        role: user.role,
        phoneNumber: user.phoneNumber,
        ...(user.hospital && {
          hospital: {
            connectOrCreate: {
              where: { subDomain: user.hospital.subDomain },
              create: {
                name: user.hospital.name,
                phoneNumber: user.hospital.phoneNumber,
              },
            },
          },
        }),
      },
    });
  }
}

// async function addHospitals() {
//   const hospitals = [
//     {
//       name: "edental",
//       phoneNumber: "99993333",
//     },
//   ];
//   for (const hospital of hospitals) {
//     await prisma.hospital.create({
//       data: {
//         name: hospital.name,
//         phoneNumber: hospital.phoneNumber,
//       },
//     });
//   }
// }
// addHospitals()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     console.log("prisma seed finished");
//     await prisma.$disconnect();
//   });
