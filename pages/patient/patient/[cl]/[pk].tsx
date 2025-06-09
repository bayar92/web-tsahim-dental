//pages/patient/patient/[pk].tsx
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

export default function Patient(){
    return(
        <Flex justify="center" align="center" minH="100vh">
            <Box p={6} border="1px" borderColor="gray.300" m={4} borderRadius="md" maxW={640} w="100%" boxShadow="md">
                <Heading size="lg" mb={6} textAlign="center">Шинэ хэрэглэгчийн бүртгэл</Heading>
                <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Картын дугаар</FormLabel>
                    <Input p={4} readOnly placeholder='4' />
                </FormControl>
                <FormControl>
                    <FormLabel>Овог</FormLabel>
                    <Input p={4} placeholder="Овгоо оруулна уу" />
                </FormControl>

                <FormControl>
                    <FormLabel>Нэр</FormLabel>
                    <Input p={4} placeholder="Нэрээ оруулна уу" />
                </FormControl>

                <FormControl>
                    <FormLabel>Утас</FormLabel>
                    <Input p={4}  placeholder="Утасны дугаар" type="tel" />
                </FormControl>

                <FormControl>
                    <FormLabel>Төрсөн огноо</FormLabel>
                    <Input p={4}  type="date" />
                </FormControl>

                <FormControl>
                    <FormLabel>Хаяг</FormLabel>
                    <Input p={4}  placeholder="Оршин суугаа хаяг" />
                </FormControl>

                <Button colorScheme="blue" mt={4}>
                    Бүртгүүлэх
                </Button>
                </Stack>
            </Box>
        </Flex>
    );
}