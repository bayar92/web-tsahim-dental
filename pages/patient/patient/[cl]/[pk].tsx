//pages/patient/patient/[db]/[pk].tsx
import { useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getDbConnectionById } from '@lib/db';
import { Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  Stack,
  Flex,} from '@chakra-ui/react';
import { BiBorderRadius } from 'react-icons/bi';

export default function Patient({
    pk,db
    }: {
    pk: string; db: string;
    }) {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [BirthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [Register, setRegister] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [reason, setReason] = useState('');

    const handleSave = async () => {
        const res = await fetch('/api/treatmentConsent/addPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tenantId: db,
            pk,
            lastName,
            firstName,
            phone,
            BirthDate,
            address,
            gender,
            Register,
            email,
            profession,
            reason
          }),
        });
        const data = await res.json();
        if (res.ok) {
            alert('Амжилттай бүртгэгдлээ');
            window.location.href = 'https://edental.mn'
        } else {
            console.error('Хариу алдаа:', data);
            alert('Алдаа гарлаа: ' + data.message);
        }
    };

    return (
    <Flex justify="center" align="center" minH="100vh">
      <Box p={4} border="1px" borderColor="gray.300" m={4} borderRadius="md" maxW={640} w="100%" boxShadow="md">
        <Heading size="lg" mb={2} textAlign="center">Шинэ хэрэглэгч бүртгэх</Heading>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel>Картын дугаар</FormLabel>
            <Input p={2} value={pk} readOnly />
          </FormControl>    
          <FormControl>
            <FormLabel>Овог</FormLabel>
            <Input p={2} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Нэр</FormLabel>
            <Input p={2} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Утас</FormLabel>
            <Input p={2} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Төрсөн огноо</FormLabel>
            <Input p={2} type="date" value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </FormControl>
          <FormControl >
            <FormLabel>Хүйс</FormLabel>
              <Select borderRadius={10} backgroundColor={'white'} value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Сонгоно уу</option>
                <option value="Эрэгтэй">Эрэгтэй</option>
                <option value="Эмэгтэй">Эмэгтэй</option>
              </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Регистрийн дугаар</FormLabel>
            <Input p={2} value={Register} onChange={(e) => setRegister(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Мэйл хаяг</FormLabel>
            <Input p={2} value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Мэргэжил</FormLabel>
            <Input p={2} value={profession} onChange={(e) => setProfession(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Сонгож ирсэн шалтгаан</FormLabel>
            <Select borderRadius={10} backgroundColor={'white'} value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Сонгоно уу</option>
                <option value="2">Гэртэй ойрхон</option>
                <option value="5">Хүн санал болгосон</option>
                <option value="6">Сошиалаас харсан</option>
                <option value="9">Бусад</option>
              </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Хаяг</FormLabel>
            <Input p={2} value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          
            <Button colorScheme="blue" onClick={handleSave}>
              Бүртгүүлэх
          </Button>         
        </Stack>
      </Box>
    </Flex>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { db, pk } = context.params as { db: string; pk: string };
const db = context.params?.cl as string;
  const pk = context.params?.pk as string;
  return {
    props: {
      db,
      pk,
    },
  };
};