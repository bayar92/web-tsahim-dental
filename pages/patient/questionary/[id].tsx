import { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Box, Checkbox, Heading, Button, Stack, Text, Textarea, Input,
  Radio, RadioGroup, useToast, CheckboxGroup, SimpleGrid
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';


const diseasesList = [
  'Шарлалт', 'В вирус', 'С вирус', 'Өндөр даралт', 'Үе мөчний өвчин',
  'Цус гардагтай', 'Сүрьеэ', 'Цус багадалт', 'Таталт', 'Хорт хавдар',
  'Ходоодны эмгэг', 'Батграш', 'Зүрхний өвчин', 'Бөөрний өвчин',
  'Эрхийн гажиг', 'Шигдэс', 'Цусны өвчин', 'Чихрийн шижин',
  'Амьсгалын гажиг', 'Гайморит', 'Нүдний даралт', 'Аль нь ч байхгүй'
];

export default function QuestionaryPage() {
  const router = useRouter();
  const [tenantId, setTenantId] = useState('');
  const [personId, setPersonId] = useState('');

  useEffect(() => {
    if (router.asPath.includes('=')) {
      const [tenant, person] = router.asPath.split('/').pop()?.split('=') || [];
      setTenantId(tenant);
      setPersonId(person);
    }
  }, [router.asPath]);

  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const [reason, setReason] = useState('');
  const [allergyName, setAllergyName] = useState('');
  const [medicationDesc, setMedicationDesc] = useState('');
  const [pregnantMonth, setPregnantMonth] = useState('');
  const [breastfeedMonth, setBreastfeedMonth] = useState('');
  const [childMonth, setChildMonth] = useState('');
  const [surgeryDesc, setSurgeryDesc] = useState('');
  const [anesthesiaDesc, setAnesthesiaDesc] = useState('');
  const [generalDesc, setGeneralDesc] = useState('');
  const [emotionalOther, setEmotionalOther] = useState('');

  const [hasAllergy, setHasAllergy] = useState('');
  const [hasMedication, setHasMedication] = useState('');
  const [hasPregnant, setHasPregnant] = useState('');
  const [hasbreastfeeding, setHasbreastfeeding] = useState('');
  const [haschild, setHaschild] = useState('');
  const [hassurgery, setHassurgery] = useState('');
  const [hasanesthesia, setHasanesthesia] = useState('');
  const [hasgeneral, setHasgeneral] = useState('');
  const [hasSmoke, setHasSmoke] = useState('');
  const [hasBlackSmoke, setHasBlackSmoke] = useState('');
  const [emotionalReaction, setEmotionalReaction] = useState('');
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [otherDisease, setOtherDisease] = useState('');

  const toast = useToast();

  const handleYesNoChange = (field: string, value: string) => {
    switch (field) {
      case 'hasAllergy': setHasAllergy(value); if (value === 'Үгүй') setAllergyName(''); break;
      case 'hasMedication': setHasMedication(value); break;
      case 'hasPregnant': setHasPregnant(value); break;
      case 'hasbreastfeeding': setHasbreastfeeding(value); break;
      case 'haschild': setHaschild(value); break;
      case 'hassurgery': setHassurgery(value); break;
      case 'hasanesthesia': setHasanesthesia(value); break;
      case 'hasgeneral': setHasgeneral(value); break;
      case 'hasSmoke': setHasSmoke(value); break;
      case 'hasBlackSmoke': setHasBlackSmoke(value); break;
      case 'emotionalReaction': setEmotionalReaction(value); break;
      default: break;
    }
  };

  const handleSubmit = async () => {
    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      toast({
        title: 'Анхааруулга',
        description: 'Гарын үсгээ зурна уу.',
        status: 'warning',
        duration: 3000
      });
      return;
    }
  const fullDataUrl = sigCanvasRef.current.toDataURL();
  const base64Data = fullDataUrl.replace(/^data:image\/png;base64,/, ''); // <-- зөвхөн base64

    const finalData = {
      tenantId,
      personId: parseInt(personId),
      questionnairePK: 1,
      SignatureData: base64Data,
      Reason: reason,
      bodisHarshil: hasAllergy === 'Тийм',
      bodisHarshilDesc: allergyName,
      emTaria: hasMedication === 'Тийм',
      emTariaDesc: medicationDesc,
      Pregnant: hasPregnant === 'Тийм',
      PregnantDesc: pregnantMonth,
      Surgery: hassurgery === 'Тийм',
      SurgeryDesc: surgeryDesc,
      Difficulty: hasgeneral === 'Тийм',
      DifficultyDesc: generalDesc,
      Uvchin: otherDisease,
      breast: hasbreastfeeding === 'Тийм',
      breastDesc: breastfeedMonth,
      children: childMonth,
      psychology: ['Сайн үзүүлдэг', 'Үзүүлэх дургүй', 'Уйлдаг', 'Бусад'].includes(emotionalReaction),
      psychologyDesc: emotionalReaction === 'Бусад' ? emotionalOther : emotionalReaction,
      sideEffects: hasanesthesia === 'Тийм',
      sideEffectsDesc: anesthesiaDesc,

      Harshil_Tiim1: hasAllergy === 'Тийм',
      Harshil_Ugui1: hasAllergy === 'Үгүй',
      EmTaria_Tiim2: hasMedication === 'Тийм',
      EmTaria_Ugui2: hasMedication === 'Үгүй',
      Jiremsen_Tiim3: hasPregnant === 'Тийм',
      Jiremsen_Ugui3: hasPregnant === 'Үгүй',
      Huhuul_Huuhedtei_Tiim4: hasbreastfeeding === 'Тийм',
      Huhuul_Huuhedtei_Ugui4: hasbreastfeeding === 'Үгүй',
      Hagalgaand_Orj_Baisan_Tiim5: hassurgery === 'Тийм',
      Hagalgaand_Orj_Baisan_Ugui5: hassurgery === 'Үгүй',
      Gaj_Nuluu_Ilerch_Baisan_Tiim6: hasanesthesia === 'Тийм',
      Gaj_Nuluu_Ilerch_Baisan_Ugui6: hasanesthesia === 'Үгүй',
      Biyiin_Hundreltei_Uchirch_Baisan_Tiim7: hasgeneral === 'Тийм',
      Biyiin_Hundreltei_Uchirch_Baisan_Ugui7: hasgeneral === 'Үгүй',
      Tamhi_Tatdag_Tiim8: hasSmoke === 'Тийм',
      Tamhi_Tatdag_Ugui8: hasSmoke === 'Үгүй',
      Har_Tamhi_Hereglej_Baisan_Tiim9: hasBlackSmoke === 'Тийм',
      Har_Tamhi_Hereglej_Baisan_Ugui9: hasBlackSmoke === 'Үгүй',

      Sain_Uzuuldeg: emotionalReaction === 'Сайн үзүүлдэг',
      Uzuuleh_Durgui: emotionalReaction === 'Үзүүлэх дургүй',
      Uildag: emotionalReaction === 'Уйлдаг',
      Busad: emotionalReaction === 'Бусад',

      Shartalt: selectedDiseases.includes('Шарлалт'),
      B_Virus: selectedDiseases.includes('В вирус'),
      C_Virus: selectedDiseases.includes('С вирус'),
      Undur_Daralt: selectedDiseases.includes('Өндөр даралт'),
      Uy_Much: selectedDiseases.includes('Үе мөчний өвчин'),
      Tsus: selectedDiseases.includes('Цус гардагтай'),
      Suriye: selectedDiseases.includes('Сүрьеэ'),
      Tsus_Bagadalt: selectedDiseases.includes('Цус багадалт'),
      Tatalt: selectedDiseases.includes('Таталт'),
      Havdar: selectedDiseases.includes('Хорт хавдар'),
      Hodood: selectedDiseases.includes('Ходоодны эмгэг'),
      Bagtraa: selectedDiseases.includes('Батграш'),
      Zurhnii_Uvchin: selectedDiseases.includes('Зүрхний өвчин'),
      Buurnii_Uvchin: selectedDiseases.includes('Бөөрний өвчин'),
      ZurhniiGajig: selectedDiseases.includes('Эрхийн гажиг'),
      Shigdees: selectedDiseases.includes('Шигдэс'),
      Tsusnii_Uvchin: selectedDiseases.includes('Цусны өвчин'),
      Chihriin_Shinjin: selectedDiseases.includes('Чихрийн шижин'),
      AmisgaliinGajig: selectedDiseases.includes('Амьсгалын гажиг'),
      Gaimorit: selectedDiseases.includes('Гайморит'),
      Nudnii_Daralt: selectedDiseases.includes('Нүдний даралт'),
      Baihgui: selectedDiseases.includes('Аль нь ч байхгүй')
    };

    console.log('📝 Final JSON:', finalData);

    try {
      await axios.post('/api/questionary/submit', finalData);
      toast({
        title: 'Амжилттай хадгалагдлаа',
        status: 'success',
        duration: 3000
      });
    } catch (error) {
      console.error('❌ Илгээх алдаа:', error);
      toast({
        title: 'Алдаа гарлаа',
        description: 'Мэдээлэл илгээх үед алдаа гарлаа',
        status: 'error',
        duration: 3000
      });
    }
  };

return (
  <Box maxW="800px" mx="auto" mt={6} mb={6} border="1px solid #ccc" borderRadius="md" justifyContent="center" alignItems="center">
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
      <RadioGroup value={hasAllergy} onChange={(val) => handleYesNoChange('hasAllergy',val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>
      {hasAllergy === 'Тийм' && (
      <Box mt={3}>
          <Text>Тийм бол ямар бодисонд харшилтай вэ?</Text>
          <Input mt={3} value={allergyName} onChange={(e) => setAllergyName(e.target.value)} placeholder="Жишээ: Пенициллин"/>
      </Box>
      )}
    </Box>
    {/* Танд байнга хэрэглэдэг эм тариа бий юу? */}
    <Box p={2}>
      <Text mb={2}>Танд байнга хэрэглэдэг эм тариа бий юу?</Text>
      <RadioGroup value={hasMedication} onChange={(val) => handleYesNoChange('hasMedication',val)} colorScheme="blue">
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
      <RadioGroup value={hasPregnant} onChange={(val) => handleYesNoChange('hasPregnant',val)} colorScheme="blue">
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
      <RadioGroup value={hasbreastfeeding} onChange={(val) => handleYesNoChange('hasbreastfeeding',val)} colorScheme="blue">
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
      <RadioGroup value={haschild} onChange={(val) => handleYesNoChange('haschild',val)} colorScheme="blue">
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
      <RadioGroup value={emotionalReaction} onChange={(val) => handleYesNoChange('emotionalReaction', val)} colorScheme="blue">
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={2}>
        
          <Radio value="Сайн үзүүлдэг">Сайн үзүүлдэг</Radio>
          <Radio value="Үзүүлэх дургүй">Үзүүлэх дургүй</Radio>
          <Radio value="Уйлдаг">Уйлдаг</Radio>
          <Radio value="Бусад">Бусад</Radio>
        </SimpleGrid>
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
       <RadioGroup value={hassurgery} onChange={(val) => handleYesNoChange('hassurgery', val)} colorScheme="blue">
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
      <RadioGroup value={hasanesthesia} onChange={(val) => handleYesNoChange('hasanesthesia', val)} colorScheme="blue">
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
       <RadioGroup value={hasgeneral} onChange={(val) => handleYesNoChange('hasgeneral', val)} colorScheme="blue">
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
      <RadioGroup value={hasSmoke} onChange={(val) => handleYesNoChange('hasSmoke', val)} colorScheme="blue">
          <Stack direction="row" spacing={6}>
              <Radio value="Тийм">Тийм</Radio>
              <Radio value="Үгүй">Үгүй</Radio>
          </Stack>
      </RadioGroup>
    </Box>
    {/*Та хар тамхи хэрэглэж байсан уу?*/}
    <Box p={2}>
      <Text mb={2}>Та хар тамхи хэрэглэж байсан уу?</Text>
      <RadioGroup value={hasBlackSmoke} onChange={(val) => handleYesNoChange('hasBlackSmoke', val)} colorScheme="blue">
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
            <Checkbox key={disease} value={disease} colorScheme="blue">
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
    <Box p={2}>
      <Text mb={2}>Гарын үсгээ зурна уу</Text>
      <Box border="1px solid #ccc" borderRadius="md" overflow="hidden" mb={2}>
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          ref={sigCanvasRef}
        />
      </Box>
      <Stack direction="row" spacing={4}>
        <Button onClick={() => sigCanvasRef.current?.clear()} colorScheme="gray">
          Арилгах
        </Button>
        <Button onClick={handleSubmit} colorScheme="teal">
          Зураг хадгалах
        </Button>
      </Stack>
    </Box>
  </Box>  
  );
}
