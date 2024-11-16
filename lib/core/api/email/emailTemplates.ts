import { EmailType } from "./types";

interface Email {
  subject: string;
  body: string;
}

interface EmailTemplateType {
  type: EmailType;
  email: Email;
}
export const emailTemplates = (type: EmailType, data: {}) => {
  const a: EmailTemplateType[] = [
    {
      type: EmailType.OneTimePassowrd,
      email: {
        subject: `Цахим дентал - Нэг удаагийн нууц үг`,
        body: `<table style="max-width: 360px; background-color: #ffffff; border: 1px solid #eee; border-radius: 5px; box-shadow: 0 5px 10px rgba(20,50,70,.2); margin-top: 20px; margin: 0 auto; padding: 68px 0 130px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td align="right" style="width:150px"><img style="width:49px;display: block; outline: none; border: none;" src="https://edental.mn/images/dental-logo.png" alt="Plaid" width="212" height="42" /></td>
<td align="left"><img style="width:120px;display: block; outline: none; border: none;" src="https://edental.mn/images/dental-text.png" alt="Plaid" width="212" height="42" /></td>
</tr>
<tr style="width: 100%;">
<td colspan="2">
<p style="font-size: 11px; line-height: 16px; margin: 16px 8px 8px 8px; color: #0a85ea; font-weight: bold; font-family: HelveticaNeue,Helvetica,Arial,sans-serif; height: 16px; letter-spacing: 0; text-transform: uppercase; text-align: center;">Таны edental.mn-д нэвтрэх нэг удаагийн код.</p>
<h1 style="maring-left: 20px; margin-right: 20px; color: #000; display: inline-block; font-family: HelveticaNeue-Medium,Helvetica,Arial,sans-serif; font-size: 20px; font-weight: 500; line-height: 24px; margin-bottom: 0; margin-top: 0; text-align: center;">Дараах кодыг оруулаад edental.mn-д нэвтрэнэ үү.</h1>
<table style="background: rgba(0,0,0,.05); border-radius: 4px; margin: 16px auto 14px; vertical-align: middle; width: 280px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td>
<p style="font-size: 32px; line-height: 40px; margin: 0 auto; color: #000; display: inline-block; font-family: HelveticaNeue-Bold; font-weight: bold; letter-spacing: 6px; padding-bottom: 8px; padding-top: 8px; width: 100%; text-align: center;">{pin}</p>
</td>
</tr>
</tbody>
</table>
<p style="font-size: 15px; line-height: 23px; margin: 0; color: #444; font-family: HelveticaNeue,Helvetica,Arial,sans-serif; letter-spacing: 0; padding: 0 40px; text-align: center;">Хэрвээ та энэ имэйлийг таньд очих ёсгүй гэж бодож байвал <a style="color: #444; text-decoration: underline;" href="mailto:head@edental.mn" target="_blank">head@edental.mn</a> хаягаар бидэнтэй холбогдоорой.</p>
</td>
</tr>
</tbody>
</table>`,
      },
    },
  ];
  const applyData = () => {
    if (a.filter((r) => r.type == type).length === 0)
      return { subject: "", body: "" };

    if (!a.filter((r) => r.type == type)[0].email)
      return { subject: "", body: "" };

    let selectedTemplate = a.filter((r) => r.type == type)[0].email;

    return {
      subject: selectedTemplate.subject.replace(
        /{([^{}}]+)}/g,
        (_match: any, valueKey: any) => {
          for (const [k, v] of Object.entries(data)) {
            if (k == valueKey) return v + "";
          }
          return _match;
        }
      ),
      body: selectedTemplate.body.replace(
        /{([^{}}]+)}/g,
        (_match: any, valueKey: any) => {
          for (const [k, v] of Object.entries(data)) {
            if (k == valueKey) return v + "";
          }
          return _match;
        }
      ),
    };
  };
  return applyData();
};
