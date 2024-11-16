import { emailTemplates } from "./emailTemplates";
import { EmailType } from "./types";

export const resendSendEmailValidationCode = async (
  receiverMail: string,
  code: string
) => {
  const emailTempate = emailTemplates(EmailType.OneTimePassowrd, { pin: code });
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: `Цахим Дентал <${process.env.RESEND_FROM_EMAIL}>`,
      to: [receiverMail],
      subject: emailTempate.subject,
      html: emailTempate.body,
      headers: {
        "X-Entity-Ref-ID": "123",
      },
    }),
  };
  await fetch("https://api.resend.com/emails", requestOptions);
};
