import { useProductVariantList } from "@lib/admin/data/productHooks";
import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, Box, TableContent, Text } from "@ui/index";
import { currencyDisplayHandler } from "@util/converters";
import useTranslation from "next-translate/useTranslation";
import TimeAgo from "react-timeago";
import { GeneralTableActions } from "../GeneralTableAction";

const columns = [
  {
    Header: "Нэр",
    Cell: (data: any) => (
      <Box>
        <Text fontWeight="bold">{data.name}</Text>
      </Box>
    ),
  },
  {
    Header: "Үнэ",
    Cell: (data: any) => (
      <Box textAlign="right">
        <Text fontWeight="semibold">
          {currencyDisplayHandler(data.price, "mn")}
        </Text>
      </Box>
    ),
  },
  {
    Header: "Duration",
    Cell: (data: any) => (
      <Badge fontSize="11px">
        {data.duration} {data.duration === 1 ? "month" : "months"}
      </Badge>
    ),
  },
  {
    Header: "Кресл",
    Cell: (data: any) => <Text>{data.sits}</Text>,
  },
  {
    Header: "Хямдрал",
    Cell: (data: any) => (
      <Box textAlign="right">
        <Text
          fontWeight="semibold"
          color={data.discount > 0 ? "green.500" : "gray.500"}
        >
          {currencyDisplayHandler(data.discount, "mn")}
        </Text>
      </Box>
    ),
  },
  {
    Header: "Үүсгэсэн",
    Cell: (data: any) => (
      <Box fontSize="xs">
        <TimeAgo date={data.createdAt} />
      </Box>
    ),
  },
];

export const AdminPriceTable = () => {
  const { t } = useTranslation("common");
  const { params, setParam } = useQueryParam({
    size: "30",
    page: "1",
    text: "",
  });

  const { data: variantList } = useProductVariantList(params);

  return (
    <>
      <GeneralTableActions params={params} setParam={setParam} />
      <TableContent columns={columns} data={variantList?.data || []} mt="4" />
      <Pagination
        name={t("common:items.variants")}
        size={Number(params.size)}
        page={Number(params.page)}
        total={variantList?.total}
        pages={variantList?.pages}
        filtered={!!params.text}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
