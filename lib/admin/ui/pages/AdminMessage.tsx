import { useMessageList } from "@lib/admin/data/messageHooks";
import { useQueryParam } from "@ui/hooks/query-param";
import { Box, TableContent, Text, TimeAgoLang } from "@ui/index";

export const columns = [
  {
    Header: "Message Id",
    Cell: (data: any) => <Text>{data.id}</Text>,
  },
  {
    Header: "User",
    Cell: (data: any) => <Text>{data.hospital?.name}</Text>,
  },
  {
    Header: "Date",
    Cell: (data: any) => (
      <Text fontSize="xs" color="gray.800" mt="1">
        <TimeAgoLang date={data.createdAt} />
      </Text>
    ),
  },
  {
    Header: "Content",
    Cell: (data: any) => <Text>{data.message}</Text>,
  },
  {
    Header: "Phone Number",
    Cell: (data: any) => <Text>{data.phoneNumber}</Text>,
  },
];
export const AdminMessage = () => {
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
  });
  const { data: messageList } = useMessageList(params);
  return (
    <>
      <TableContent columns={columns} data={messageList || []} />
    </>
  );
};
