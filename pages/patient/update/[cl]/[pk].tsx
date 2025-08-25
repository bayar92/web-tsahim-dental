// pages/patient/update/[cl]/[pk].tsx
import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  Box, Heading, Input, FormControl, FormLabel, Button, Select, Stack, Flex,
  useToast, FormHelperText
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Patient({ pk, cl }: { pk: string; cl: string }) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [BirthDate, setBirthDate] = useState(''); // 'YYYY-MM-DD'
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [Register, setRegister] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [cardNumber, setcardNumber] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(true);

  const toast = useToast();
  const router = useRouter();

  // ISO → 'YYYY-MM-DD'
  const toDateInputValue = (iso?: string | null) => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      if (isNaN(+d)) return '';
      return d.toISOString().slice(0, 10);
    } catch {
      return '';
    }
  };

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {const res = await fetch(
            `/api/treatmentConsent/getPatient?tenantId=${encodeURIComponent(cl)}&pk=${encodeURIComponent(pk)}`
            );
        
        if (aborted) return;

        if (res.ok) {
          const p = await res.json();
          setcardNumber(p?.CardNumber);
          setLastName(p?.LastName ?? '');
          setFirstName(p?.FirstName ?? '');
        //   setPhone(p?.PhoneNumber ?? '');
          setPhone(p?.PhoneNumber ? String(p.PhoneNumber) : '');
          setBirthDate(toDateInputValue(p?.BirthDate));
          setAddress(p?.Address ?? '');
          setGender(p?.Gender ?? '');
          setRegister(p?.Register ?? '');
          setEmail(p?.Email ?? '');
          setProfession(p?.Profession ?? '');
          setReason(p?.Reason ?? '');
        } else if (res.status === 404) {
          toast({
            title: 'Өгөгдөл олдсонгүй',
            description: 'Энэ картын дугаартай хэрэглэгч бүртгэлгүй байна.',
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        } else {
          const data = await res.json().catch(() => ({}));
          toast({
            title: 'Урьдчилан бөглөхөд алдаа гарлаа',
            description: data?.message ?? 'Тодорхойгүй алдаа',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (e: any) {
        if (!aborted) {
          toast({
            title: 'Сүлжээний алдаа',
            description: e?.message ?? 'Дараа дахин оролдоно уу',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
      } finally {
        if (!aborted) setPrefillLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [cl, pk, toast]);

  const handleSave = async () => {
    if (!firstName?.trim()) {
      toast({ title: 'Нэр заавал', status: 'warning' });
      return;
    }
    if (!phone?.trim()) {
      toast({ title: 'Утас заавал', status: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        tenantId: cl,
        pk,
        cardNumber : String(cardNumber).trim() || null,
        lastName: lastName?.trim() || null,
        firstName: firstName.trim(),
        phone: String(phone).trim(), 
        BirthDate: BirthDate || null, // сервер талдаа parse
        address: address?.trim() || null,
        gender: gender || null,
        Register: Register?.trim() || null,
        email: email?.trim() || null,
        profession: profession?.trim() || null,
        reason: reason ? String(reason) : null,
      };

      const res = await fetch('/api/treatmentConsent/editPatient', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast({ title: 'Амжилттай шинэчлэгдлээ', status: 'success', duration: 2200, isClosable: true });
        router.push('https://edental.mn');
      } else if (res.status === 404) {
        toast({
          title: 'Өгөгдөл олдсонгүй',
          description: 'Карт тохирох бичлэг олдсонгүй. Картын дугаараа шалгана уу.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Алдаа гарлаа',
          description: data?.message ?? 'Тодорхойгүй алдаа',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      toast({
        title: 'Сүлжээний алдаа',
        description: err?.message ?? 'Дахин оролдоно уу',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.50">
      <Box p={6} border="1px" borderColor="gray.200" m={4} borderRadius="md" maxW={640} w="100%" boxShadow="sm" bg="white">
        <Heading size="lg" mb={4} textAlign="center">
          Хэрэглэгчийн мэдээлэл шинэчлэх
        </Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Картын дугаар</FormLabel>
            <Input p={2} value={cardNumber} readOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Овог</FormLabel>
            <Input p={2} value={lastName} onChange={(e) => setLastName(e.target.value)} isDisabled={loading || prefillLoading} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Нэр</FormLabel>
            <Input p={2} value={firstName} onChange={(e) => setFirstName(e.target.value)} isDisabled={loading || prefillLoading} />
            <FormHelperText>Заавал бөглөнө.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Утас</FormLabel>
            <Input
              p={2}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              isDisabled={loading || prefillLoading}
              placeholder="********"
            />
            <FormHelperText>Заавал бөглөнө.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Төрсөн огноо</FormLabel>
            <Input p={2} type="date" value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} isDisabled={loading || prefillLoading} />
          </FormControl>

          <FormControl>
            <FormLabel>Хүйс</FormLabel>
            <Select borderRadius={10} bg="white" value={gender} onChange={(e) => setGender(e.target.value)} isDisabled={loading || prefillLoading}>
              <option value="">Сонгоно уу</option>
              <option value="Эрэгтэй">Эрэгтэй</option>
              <option value="Эмэгтэй">Эмэгтэй</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Регистрийн дугаар</FormLabel>
            <Input p={2} value={Register} onChange={(e) => setRegister(e.target.value)} isDisabled={loading || prefillLoading} />
          </FormControl>

          <FormControl>
            <FormLabel>Мэйл хаяг</FormLabel>
            <Input p={2} value={email} onChange={(e) => setEmail(e.target.value)} isDisabled={loading || prefillLoading} />
          </FormControl>

          <FormControl>
            <FormLabel>Мэргэжил</FormLabel>
            <Input p={2} value={profession} onChange={(e) => setProfession(e.target.value)} isDisabled={loading || prefillLoading} />
          </FormControl>

          <FormControl>
            <FormLabel>Сонгож ирсэн шалтгаан</FormLabel>
            <Select borderRadius={10} bg="white" value={reason} onChange={(e) => setReason(e.target.value)} isDisabled={loading || prefillLoading}>
              <option value="">Сонгоно уу</option>
              <option value="2">Гэртэй ойрхон</option>
              <option value="5">Хүн санал болгосон</option>
              <option value="6">Сошиалаас харсан</option>
              <option value="9">Бусад</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Хаяг</FormLabel>
            <Input p={2} value={address} onChange={(e) => setAddress(e.target.value)} isDisabled={loading || prefillLoading} />
          </FormControl>

          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={loading || prefillLoading}
            loadingText="Уншиж байна..."
            spinnerPlacement="start"
          >
            Шинэчлэх
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cl = context.params?.cl as string;
  const pk = context.params?.pk as string;

  return {
    props: { cl, pk },
  };
};
