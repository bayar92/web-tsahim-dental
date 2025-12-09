// pages/patient/patient/[db]/[pk].tsx
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Box, Heading, Input, FormControl, FormLabel, Button, Select, Stack, Flex, useToast, FormHelperText } from '@chakra-ui/react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, Divider
} from "@chakra-ui/react";

import { useRouter } from 'next/router';
import { register } from 'ts-node';

export default function Patient({ pk, cl }: { pk: string; cl: string }) {
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
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const registerRegex = /^[A-Z]{2}\d{8}$/;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [savedInfo, setSavedInfo] = useState<any>(null);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: 'Мэдээлэл дутуу байна',
        description: 'Овог болон Нэр заавал бөглөнө үү.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!phone.trim()) {
      toast({
        title: 'Мэдээлэл дутуу байна',
        description: 'Утасны дугаараа оруулна уу.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
 
    if (!Register.trim()) {
      toast({
        title: 'Мэдээлэл дутуу байна',
        description: 'Регистерийн дугаараа оруулна уу.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // if (!registerRegex.test(Register.toUpperCase())) {
    //   toast({
    //     title: 'Регистрийн дугаар буруу байна',
    //     description: 'Зөв формат: AA###### (2 үсэг + 8 тоо)',
    //     status: 'warning',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }
  
    try {
      setLoading(true);
      const res = await fetch('/api/treatmentConsent/addPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: cl,
          pk,
          lastName: lastName || null,
          firstName,
          phone,
          BirthDate: BirthDate || null,
          address: address || null,
          gender: gender || null,
          Register: Register || null,
          email: email || null,
          profession: profession || null,
          reason: reason || null,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setSavedInfo({
          cardNumber: data.cardNumber,
          firstName, lastName,
          phone,
        });
  
        toast({
          title: 'Амжилттай бүртгэгдлээ',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
  
        onOpen();
  
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
      {cl == 'GZeuFqzMLRSEniaz' && ( 
        <Heading size="lg" mb={4} textAlign="center">
          "Зонне" шүдний эмнэлэг
        </Heading>
      )}
        <Heading size="lg" mb={4} textAlign="center">
          Шинэ хэрэглэгч бүртгэх
        </Heading>
        <Stack spacing={4}>
          {cl !== 'GZeuFqzMLRSEniaz' && (
            <FormControl>
              <FormLabel>Картын дугаар</FormLabel>
              <Input p={2} value={pk} readOnly />
            </FormControl>
          )}

          <FormControl isRequired>
            <FormLabel>Овог</FormLabel>
            <Input p={2} value={lastName} onChange={(e) => setLastName(e.target.value)} isDisabled={loading} />
            <FormHelperText>Заавал бөглөнө.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Нэр</FormLabel>
            <Input p={2} value={firstName} onChange={(e) => setFirstName(e.target.value)} isDisabled={loading} />
            <FormHelperText>Заавал бөглөнө.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Утас</FormLabel>
            <Input
              p={2}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              isDisabled={loading}
              placeholder="99112233"
            />
            <FormHelperText>Заавал бөглөнө.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Регистрийн дугаар</FormLabel>
            <Input p={2} value={Register} onChange={(e) => setRegister(e.target.value)} isDisabled={loading} />
            <FormHelperText>Заавал бөглөнө.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Төрсөн огноо</FormLabel>
            <Input p={2} type="date" value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} isDisabled={loading} />
          </FormControl>

          <FormControl>
            <FormLabel>Хүйс</FormLabel>
            <Select borderRadius={10} bg="white" value={gender} onChange={(e) => setGender(e.target.value)} isDisabled={loading}>
              <option value="">Сонгоно уу</option>
              <option value="Эрэгтэй">Эрэгтэй</option>
              <option value="Эмэгтэй">Эмэгтэй</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Мэйл хаяг</FormLabel>
            <Input p={2} value={email} onChange={(e) => setEmail(e.target.value)} isDisabled={loading} />
          </FormControl>
          <FormControl>
            <FormLabel>Мэргэжил</FormLabel>
            <Input p={2} value={profession} onChange={(e) => setProfession(e.target.value)} isDisabled={loading} />
          </FormControl>
          <FormControl>
            <FormLabel>Сонгож ирсэн шалтгаан</FormLabel>
            <Select borderRadius={10} bg="white" value={reason} onChange={(e) => setReason(e.target.value)} isDisabled={loading}>
              <option value="">Сонгоно уу</option>
              <option value="2">Гэртэй ойрхон</option>
              <option value="5">Хүн санал болгосон</option>
              <option value="6">Сошиалаас харсан</option>
              <option value="9">Бусад</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Хаяг</FormLabel>
            <Input p={2} value={address} onChange={(e) => setAddress(e.target.value)} isDisabled={loading} />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={loading}
            loadingText="Уншиж байна..."
            spinnerPlacement="start"
          >
            Бүртгүүлэх
          </Button>
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="xl" p={2}>
        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">
          🎉 Бүртгэл амжилттай!
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            bg="gray.50"
          >
            <Stack spacing={3} fontSize="md">
              <Box>
                <strong style={{ color: "#2B6CB0" }}>Картын дугаар:</strong>
                <Box
                  fontSize="xl"
                  fontWeight="bold"
                  color="blue.600"
                  mt={1}
                  p={2}
                  bg="white"
                  borderRadius="md"
                  textAlign="center"
                  border="1px dashed #3182CE"
                >
                  {savedInfo?.cardNumber}
                </Box>
              </Box>

              <Divider />

              <Box>
                <strong style={{ color: "#2F855A" }}>Үйлчлүүлэгч:</strong>
                <Box mt={1}>{savedInfo?.lastName} {savedInfo?.firstName}</Box>
              </Box>

              <Box>
                <strong style={{ color: "#805AD5" }}>Утас:</strong>
                <Box mt={1}>{savedInfo?.phone}</Box>
              </Box>
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button 
            colorScheme="blue" 
            w="100%" 
            borderRadius="full"
            size="lg"
            onClick={() => router.push('https://edental.mn')}
          >
            Хаах
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    </Flex>
    
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Route: /patient/patient/[db]/[pk]
  const cl = context.params?.cl as string;
  const pk = context.params?.pk as string;

  return {
    props: { cl, pk },
  };
};
