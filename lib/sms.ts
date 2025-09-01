export async function sendSMS(phone: string, message: string) {
  // if (!phone) return;
  // const baseUrl = "https://sms-api.telcocom.mn/sms-api/v1/sms/telco/send";
  // const tenantId = "664b1179b84a7748cdacaddb";
  // const url = `${baseUrl}?tenantId=${tenantId}&toNumber=${encodeURIComponent(
  //   phone
  // )}&sms=${encodeURIComponent(message)}`;

  console.log(`📨 Sending to ${phone}: ${message}`);
  // try {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "telco-auth-token": "84ee4a3138f12d25762c3b31681c4504",
  //     },
  //   });

  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     throw new Error(`SMS send failed: ${response.status} - ${errorText}`);
  //   }

  //   const result = await response.json();
  //   return result;
  // } catch (err) {
  //   console.error("❌ SMS илгээхэд алдаа:", err);
  //   throw err;
  // }
}
