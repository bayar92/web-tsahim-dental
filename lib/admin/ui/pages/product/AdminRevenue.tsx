import { TableContent, TimeAgoLang } from "@ui/index";
import { Text } from "@ui/index";

const stringPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
};
export const columns = [
  {
    Header: "Hospital",
    Cell: (data: any) => <Text>{data.id}</Text>,
  },
  {
    Header: "Date",
    Cell: (data: any) => (
      <Text fontSize="xs" color="gray.800" mt="1">
        <TimeAgoLang date={data.date} />
      </Text>
    ),
  },
  {
    Header: "Product",
    Cell: (data: any) => <Text>{data.product}</Text>,
  },
  {
    Header: "Quantity",
    Cell: (data: any) => <Text>{data.quantity}</Text>,
  },
  {
    Header: "Revenue",
    Cell: (data: any) => <Text>{stringPrice(data.revenue)}</Text>,
  },
];
export const AdminRevenue = () => {
  return <TableContent columns={columns} data={[]} />;
};
