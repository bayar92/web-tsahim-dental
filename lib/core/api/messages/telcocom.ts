type telcoComResponseType = {
  result: boolean;
  message: string | null;
  data: string | null;
  messageRequestId: string | null;
  responseCode: string | null;
};

export const sendMessageViaTelcocom = async (
  messageRequestId: string,
  phoneNumber: string,
  messageContent: string
) => {
  const url = `https://sms-api.telcocom.mn/sms-api/v1/sms/telco/send?tenantId=664b1179b84a7748cdacaddb&toNumber=${phoneNumber}&sms=${messageContent}`;

  //send request to chatwoot
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "telco-auth-token": "84ee4a3138f12d25762c3b31681c4504",
    },
  });
  const data: telcoComResponseType = await response.json();
  data.responseCode = response.status.toString();
  data.messageRequestId = messageRequestId;

  return data;
};
