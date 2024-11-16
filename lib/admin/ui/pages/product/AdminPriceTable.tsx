import { useProductVariantList } from "@lib/admin/data/productHooks";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, Box, Pill, Select, TableContent, Text } from "@ui/index";
import TimeAgo from "react-timeago";

export const columns = [
  {
    Header: "Name",
    Cell: (data: any) => (
      <Text fontSize="xs" color="gray.800" mt="1">
        {data.name}
      </Text>
    ),
  },
  {
    Header: "Duration",
    Cell: (data: any) => (
      <Text fontSize="xs" color="gray.800" mt="1">
        {data.duration} хоног
      </Text>
    ),
  },
  {
    Header: "Discount",
    Cell: (data: any) => (
      <Badge fontSize="xs">-{stringPrice(data.discount)}</Badge>
    ),
  },
  {
    Header: "Price",
    Cell: (data: any) => <Badge>{stringPrice(data.price)}</Badge>,
  },
];
const stringPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "₮";
};
export const AdminPriceTable = () => {
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
    product: "",
  });
  const { data: variantList } = useProductVariantList(params);
  return (
    <>
      <TableContent columns={columns} data={variantList || []} />
    </>
  );
};
