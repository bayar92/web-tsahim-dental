import { Text } from "@chakra-ui/react";
import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { HospitalGBQ } from "@lib/admin/ui/pages/Hospital/HospitalGBQ";
import { withRequireLogin } from "@lib/auth/ui";

const generalBodyQ = [
  {
    title: "Ерөнхий биеийн асуумж",
    content: [
      {
        status: true,
        info: "Манай эмнэлэгт ирсэн шалтгаан юу вэ?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: true,
        info: "Та ямар нэгэн эмийн бодисноос харшилтай юу ?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: false,
        info: "Таньд байнга хэрэглэдэг эм тариа байгаа юу ?",
      },
      {
        status: true,
        info: "Та жирэмсэн үү?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: true,
        info: "Та хөхүүл хүүхэдтэй юу?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: false,
        info: "Таны хүүхэд хамгийн сүүлд хэзээ шүдний эмнэлэгт үзүүлсэн бэ?",
      },
      {
        status: true,
        info: "Таны хүүхэд шүдний эмчид үзүүлэхдээ сэтгэлзүй ямар байсан бэ?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: true,
        info: "Та хагалгаанд орж байсан уу?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: false,
        info: "Та шүдний эмнэлэгт эмчилгээ хийлгэх үед эсвэл мэдээ алдууулах тариа хийлгэх үед гаж нөлөө илэрч байсан уу?",
      },
      {
        status: false,
        info: "Та урьд нь шүдний эмнэлэгт үзүүлж байхдаа ерөнхий биеийн хүндрэлтэй учирч байсан уу?",
      },
      {
        status: true,
        info: "Та тамхи татдаг уу?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: true,
        info: "Та хар тамхи хэрэглэж байсан уу?",
        answer: "Тиймээ нэг эмнээс",
      },
      {
        status: false,
        info: "Дараах өвчин эмгэгүүдээс таньд байгаа юу?",
      },
      {
        status: false,
        info: "Бусад өвчин эмгэг?",
      },
    ],
    signature: "М.С.Багтлан",
  },
];
//General Body Questionnaire
const HospitalGBQPage = () => (
  <HospitalLayout>
    <Text fontSize={24} mb={8}>
      Ерөнхий биеийн асуумж
    </Text>
    {generalBodyQ.map((item, index) => (
      <HospitalGBQ
        title={item.title}
        content={item.content}
        signature={item.signature}
        key={index}
      />
    ))}
  </HospitalLayout>
);
export default withRequireLogin(HospitalGBQPage);
