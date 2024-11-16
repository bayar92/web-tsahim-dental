import { useWaitList } from "@lib/waitlist/data/userHooks";
import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Box, TableContent, Text } from "@ui/index";
import TimeAgo from "react-timeago";
import { WailtListActions } from "./WailtListActions";

export const columns = [
  {
    Header: "Name",
    Cell: (data: any) => <Text>{data.name}</Text>,
  },
  {
    Header: "Phone Number",
    Cell: (data: any) => <Text>{data.phoneNumber}</Text>,
  },
  {
    Header: "Created",
    Cell: (data: any) => (
      <Box fontSize="xs">
        <TimeAgo date={data.createdAt} />
      </Box>
    ),
  },
];

export const WaitList = () => {
  const { params, setParam } = useQueryParam({
    size: "20",
    page: "1",
    text: "",
  });
  const { data: waitList } = useWaitList(params);

  return (
    <>
      <WailtListActions params={params} setParam={setParam} />
      <TableContent columns={columns} data={waitList?.data || []} mt="4" />
      <Pagination
        name={"Waitlist"}
        size={Number(params.size)}
        page={Number(params.page)}
        total={waitList?.total}
        pages={waitList?.pages}
        filtered={!!params.text}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
