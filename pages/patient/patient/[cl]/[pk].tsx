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
  Stack,
  Flex,} from '@chakra-ui/react';

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

    const handleSave = async () => {
        const res = await fetch('/api/treatmentConsent/addPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tenantId:db,
            pk,
            lastName,
            firstName,
            phone,
            BirthDate,
            address,
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
      <Box p={6} border="1px" borderColor="gray.300" m={4} borderRadius="md" maxW={640} w="100%" boxShadow="md">
        <Heading size="lg" mb={6} textAlign="center">Шинэ хэрэглэгч бүртгэх</Heading>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Картын дугаар</FormLabel>
            <Input p={4} value={pk} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Овог</FormLabel>
            <Input p={4} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Нэр</FormLabel>
            <Input p={4} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Утас</FormLabel>
            <Input p={4} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Төрсөн огноо</FormLabel>
            <Input p={4} type="date" value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Хаяг</FormLabel>
            <Input p={4} value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" mt={10} onClick={handleSave}>
            Бүртгэх
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