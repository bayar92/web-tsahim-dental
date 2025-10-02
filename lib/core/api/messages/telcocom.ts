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
  const url = `https://sms-api.telcocom.mn/sms-api/v2/sms/telco/send?tenantId=664b1179b84a7748cdacaddb&toNumber=${phoneNumber}&sms=${messageContent}`;
  //  https://sms-api.telcocom.mn/sms-api/v2/sms/send?tenantId=664b1179b84a7748cdacaddb&toNumber={toNumber}&sms={sms}

  //send request to chatwoot
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "telco-auth-token": "W_gwalorzSuk6yGCDREA434RRNtx-8sfb1yfI-5dMfM",
    },
  });
  const data: telcoComResponseType = await response.json();
  data.responseCode = response.status.toString();
  data.messageRequestId = messageRequestId;

  return data;
};
