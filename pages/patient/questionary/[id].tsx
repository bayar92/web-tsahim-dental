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
  useToast
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
    const [reason, setReason] = useState<string>('');
    const [hasAllergy, setHasAllergy] = useState<string>('');
    const [hasMedication, setHasMedication] = useState<string>('');
    const [hasPregnant, setHasPregnant] = useState<string>('');

    const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
    const [otherDisease, setOtherDisease] = useState<string>('');
  
    const toast = useToast();
    const [allergyName, setAllergyName] = useState('');
    const [emotionalReaction, setEmotionalReaction] = useState('');

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
                <RadioGroup value={hasAllergy} onChange={setHasAllergy} colorScheme="blue">
                    <Stack direction="row" spacing={6}>
                        <Radio value="Тийм">Тийм</Radio>
                        <Radio value="Үгүй">Үгүй</Radio>
                    </Stack>
                </RadioGroup>

                {hasAllergy === 'Тийм' && (
                <Box mt={3}>
                    <Text>Тийм бол ямар бодисонд харшилтай вэ?</Text>
                    <Input mt={3}/>
                </Box>
                )}
            </Box>

            {/* Танд байнга хэрэглэдэг эм тариа бий юу? */}
            <Box p={2}>
                <Text mb={2}>Танд байнга хэрэглэдэг эм тариа бий юу?</Text>
                <RadioGroup value={hasMedication} onChange={setHasMedication} colorScheme="blue">
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
                <RadioGroup value={hasPregnant} onChange={setHasPregnant} colorScheme="blue">
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

      {/* Сэтгэлзүйн хариу (Хүүхдэд) */}
      <Box mb={4}>
        <Text mb={2}>
          Таны хүүхэд шүдний эмчид үзүүлэхэд сэтгэлзүйн ямар байдалтай байв? (Хүүхдэд)
        </Text>
        <RadioGroup
          onChange={setEmotionalReaction}
          value={emotionalReaction}
        >
          <Stack direction="row" spacing={4}>
            <Radio value="Сайн үзүүлдэг">Сайн үзүүлдэг</Radio>
            <Radio value="Үзүүлэх дургүй">Үзүүлэх дургүй</Radio>
            <Radio value="Уйлдаг">Уйлдаг</Radio>
            <Radio value="Бусад">Бусад</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  );
}
