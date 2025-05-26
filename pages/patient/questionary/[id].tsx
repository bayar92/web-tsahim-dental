import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Checkbox,
  Heading,
  Stack,
  Text,
  Textarea,
  Input,
  Radio,
  RadioGroup,
  useToast,
  CheckboxGroup,SimpleGrid
} from '@chakra-ui/react';
import axios from 'axios';

const diseasesList = [
  'Шарлалт', 'В вирус', 'С вирус', 'Өндөр даралт', 'Үе мөчний өвчин',
  'Цус гардагтай', 'Сүрьеэ', 'Цус багадалт', 'Таталт', 'Хорт хавдар',
  'Ходоодны эмгэг', 'Батграш', 'Зүрхний өвчин', 'Бөөрний өвчин',
  'Эрхийн гажиг', 'Шигдэс', 'Цусны өвчин', 'Чихрийн шижин',
  'Амьсгалын гажиг', 'Гайморит', 'Нүдний даралт', 'Аль нь ч байхгүй'
];

type QuestionaryForm = {
  userID: string;
  diseases: string[];
  otherDisease: string;
  reason: string;
};

export default function QuestionaryPage() {
  
  const [allergyName, setAllergyName] = useState('');
  const [reason, setReason] = useState<string>('');
  const [hasAllergy, setHasAllergy] = useState<string>('');
  const [hasMedication, setHasMedication] = useState<string>('');
  const [hasPregnant, setHasPregnant] = useState<string>('');
  const [hasbreastfeeding, setHasbreastfeeding] = useState<string>(''); 
  const [haschild, setHaschild] = useState<string>(''); 
  const [hassurgery, setHassurgery] = useState<string>('');
  const [hasanesthesia , setHasanesthesia ] = useState<string>(''); 
  const [hasgeneral, setHasgeneral] = useState<string>(''); 
  const [hasSmoke, setHasSmoke] = useState(''); 
  const [hasBlackSmoke, setHasBlackSmoke] = useState(''); 
  const [emotionalReaction, setEmotionalReaction] = useState('');
  
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [otherDisease, setOtherDisease] = useState<string>('');

  const toast = useToast();
  
  const handleYesNoChange = (field: string, value: string) => {
  switch (field) {
    case 'hasAllergy':
      setHasAllergy(value);
      if (value === 'Үгүй') setAllergyName('');
      break;
    case 'hasMedication':
      setHasMedication(value);
      // энэ хэсэгт input clear хийх бол нэмж болно
      break;
    case 'hasPregnant':
      setHasPregnant(value);
      break;
    case 'hasbreastfeeding':
      setHasbreastfeeding(value);
      break;
    case 'haschild':
      setHaschild(value);
      break;
    case 'hassurgery':
      setHassurgery(value);
      break;
    case 'hasanesthesia':
      setHasanesthesia(value);
      break;
    case 'hasgeneral':
      setHasgeneral(value);
      break;
    case 'hasSmoke':
      setHasSmoke(value);
      break;
    case 'hasBlackSmoke':
      setHasBlackSmoke(value);
      break;
    default:
      break;
  }
};

return (
  <Box maxW="800px" mx="auto" mt={6} border="1px solid #ccc" borderRadius="md">
    {/* Шалтгаан */}
    <Box p={2}>
        <Text mb={2}>Манай эмнэлэгт ирсэн шалтгаан юу вэ?</Text>
        <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Энд бичнэ үү"
        />
    </Box>
    {/* Эмийн харшил */}
    <Box p={2}>
      <Text mb={2}>Та ямар нэгэн эмийн бодист харшилтай юу?</Text>
      <RadioGroup value={hasAllergy} onChange={(val) => handleYesNoChange('setHasAllergy',val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>
      {hasAllergy === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол ямар бодисонд харшилтай вэ?</Text>
          <Input
          mt={3}
          value={allergyName}
          onChange={(e) => setAllergyName(e.target.value)}
          placeholder="Жишээ: Пенициллин"
        />
      </Box>
      )}
    </Box>
    {/* Танд байнга хэрэглэдэг эм тариа бий юу? */}
    <Box p={2}>
      <Text mb={2}>Танд байнга хэрэглэдэг эм тариа бий юу?</Text>
      <RadioGroup value={hasMedication} onChange={(val) => handleYesNoChange('setHasMedication',val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>

      {hasMedication === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол ямар ?</Text>
          <Input mt={3}/>
      </Box>
    )}
    </Box>
    {/* Та жирэмснэ үү? (Эмэгтэйчүүдэд хамааралтай) */}
    <Box p={2}>
      <Text mb={2}>Та жирэмснэ үү? (Эмэгтэйчүүдэд хамааралтай) </Text>
      <RadioGroup value={hasPregnant} onChange={(val) => handleYesNoChange('setHasPregnant',val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>

      {hasPregnant === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол хэдэн сартай вэ?</Text>
          <Input mt={3}/>
      </Box>
      )}
    </Box>
    { /*Та хөхүүл хүүхэдтэй юу? (Эмэгтэйчүүдэд хамааралтай) */}
    <Box p={2}>
      <Text mb={2}>Та хөхүүл хүүхэдтэй юу? (Эмэгтэйчүүдэд хамааралтай)  </Text>
      <RadioGroup value={hasbreastfeeding} onChange={(val) => handleYesNoChange('setHasbreastfeeding',val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>

      {hasbreastfeeding === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол хэдэн сартай вэ?</Text>
          <Input mt={3}/>
      </Box>
      )}
    </Box>
    {/*Таны хүүхэд хамгийн сүүлд хэзээ шүдний эмнэлэгт үзүүлсэн бэ? (Хүүхдэд хамааралтай) */}
    <Box p={2}>
      <Text mb={2}>Та хөхүүл хүүхэдтэй юу? (Эмэгтэйчүүдэд хамааралтай)  </Text>
      <RadioGroup value={haschild} onChange={(val) => handleYesNoChange('setHaschild',val)} colorScheme="blue">
        <Stack direction="row" spacing={6}>
            <Radio value="Тийм">Тийм</Radio>
            <Radio value="Үгүй">Үгүй</Radio>
        </Stack>
      </RadioGroup>

      {haschild  === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол хэдэн сартай вэ?</Text>
          <Input mt={3}/>
      </Box>
      )}
    </Box>
    {/* Таны хүүхэд шүдний эмчид үзүүлэхдээ сэтгэлзүй ямар байсан бэ? (Хүүхдэд хамааралтай) */}
    <Box p={2}>
      <Text mb={2}>
        Таны хүүхэд шүдний эмчид үзүүлэхдээ сэтгэлзүй ямар байсан бэ? (Хүүхдэд хамааралтай)
      </Text>
      <RadioGroup value={emotionalReaction} onChange={(val) => handleYesNoChange('setEmotionalReaction', val)} colorScheme="blue">
        <Stack direction="row" spacing={4}>
          <Radio value="Сайн үзүүлдэг">Сайн үзүүлдэг</Radio>
          <Radio value="Үзүүлэх дургүй">Үзүүлэх дургүй</Radio>
          <Radio value="Уйлдаг">Уйлдаг</Radio>
          <Radio value="Бусад">Бусад</Radio>
        </Stack>
      </RadioGroup>
      {emotionalReaction === 'Бусад' && (
        <Box mt={3}>
          <Text>Шалтгаан бичнэ үү</Text>
          <Input mt={3} />
        </Box>
      )}
    </Box>
    {/*Та хагалгаанд орж байсан уу? */}
    <Box p={2}>
      <Text mb={2}>Та хагалгаанд орж байсан уу?</Text>
       <RadioGroup value={hassurgery} onChange={(val) => handleYesNoChange('setHassurgery', val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>

      {hassurgery  === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол хэзээ ямар хагалгаанд орсон бэ?</Text>
          <Input mt={3}/>
      </Box>
      )}
    </Box>
    {/*Та шүдний эмнэлэгт эмчилгээ хийлгэх үед эсвэл мэдээ алдуулах тариа хийлгэх үед гаж нөлөө илэрч байсан уу?*/}
    <Box p={2}>
      <Text mb={2}>Та шүдний эмнэлэгт эмчилгээ хийлгэх үед эсвэл мэдээ алдуулах тариа хийлгэх үед гаж нөлөө илэрч байсан уу?</Text>
      <RadioGroup value={hasanesthesia} onChange={(val) => handleYesNoChange('setHasanesthesia', val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>

      {hasanesthesia  === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол ямар гаж нөлөө илэрч байсан бэ?</Text>
          <Input mt={3}/>
      </Box>
      )}
    </Box>
    {/*Та урьд нь шүдний эмнэлэгт үзүүлж байхдаа ерөнхий биеийн хүндрэлтэй учирч байсан уу?*/}
    <Box p={2}>
      <Text mb={2}>Та урьд нь шүдний эмнэлэгт үзүүлж байхдаа ерөнхий биеийн хүндрэлтэй учирч байсан уу?</Text>
       <RadioGroup value={hasgeneral} onChange={(val) => handleYesNoChange('setHasgeneral', val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>

      {hasgeneral  === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол ямар хүндрэлтэй учирч байсан бэ?</Text>
          <Input mt={3}/>
      </Box>
      )}
    </Box>
    {/*Та тамхи татдаг уу?*/}
    <Box p={2}>
      <Text mb={2}>Та тамхи татдаг уу?</Text>
      <RadioGroup value={hasSmoke} onChange={(val) => handleYesNoChange('setHasSmoke', val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>
    </Box>
    {/*Та хар тамхи хэрэглэж байсан уу?*/}
    <Box p={2}>
      <Text mb={2}>Та хар тамхи хэрэглэж байсан уу?</Text>
      <RadioGroup value={hasBlackSmoke} onChange={(val) => handleYesNoChange('setHasBlackSmoke', val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>
    </Box>
    {/*Дараах өвчин эмгэгүүд танд бий юу?*/}
    <Box p={2}>
      <Text mb={2}>Дараах өвчин эмгэгүүд танд бий юу?</Text>
      <CheckboxGroup
        value={selectedDiseases}
        onChange={(values) => setSelectedDiseases(values as string[])}
      >
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={2}>
          {diseasesList.map((disease) => (
            <Checkbox key={disease} value={disease}>
              {disease}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </Box>
    {/*Өөр өвчин байвал тодруулж бичнэ үү! */}
    <Box p={2}>
        <Text mb={2}>Өөр өвчин байвал тодруулж бичнэ үү!</Text>
        <Textarea
        value={otherDisease}
        onChange={(e) => setOtherDisease(e.target.value)}
        placeholder="Энд бичнэ үү"
        />
    </Box>
  </Box>  
  );
}
