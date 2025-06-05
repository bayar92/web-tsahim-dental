//pages/patient/treatmentConsent/[clinic]/[personId].tsx
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { GetServerSideProps } from 'next';
import { getDbConnectionById } from '@lib/db';

type Treatment = {
  PK: number;
  Title: string;
  ConsentContent: string;
  TreatmentItemPK: number;
};

export default function TreatmentPage({ treatments, tenantDB, personId,  }: { treatments: Treatment[]; tenantDB: string; personId: number; }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Treatment | null>(null);
  const [checked, setChecked] = useState(false);
  const sigPadRef = useRef<SignaturePad | null>(null);

  const handleOpen = (treatment: Treatment) => {
    setSelected(treatment);
    setChecked(false);
    onOpen();
  };

  const handleClear = () => {
    sigPadRef.current?.clear();
  };

  const handleSave = async () => {
    if (!checked) {
      alert('Та зөвшөөрөлтэй танилцсан гэж тэмдэглэнэ үү.');
      return;
    }
    if (sigPadRef.current?.isEmpty()) {
      alert('Гарын үсэг зурна уу.');
      return;
    }
    const signatureImage = sigPadRef.current?.getCanvas().toDataURL('image/png');
    if (!signatureImage) {
      alert('Гарын үсгийн өгөгдөл уншигдсангүй.');
      return;
    }    
    const rawBase64 = signatureImage?.split(',')[1];
    
    const payload = {
      tenantId: tenantDB,
      personId: personId,
      treatmentConsentPK: selected?.PK,
      signatureBase64: rawBase64,
    };

      try {
        const res = await fetch('/api/treatmentConsent/save-agreements', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

        if (!res.ok) throw new Error('Хадгалах үед алдаа');

        alert('Амжилттай хадгалагдлаа!');
        onClose();
      } catch (err) {
        console.error('Хадгалах үед алдаа:', err);
        alert('Хадгалах үед алдаа гарлаа');
      }

    onClose();
    
  };


  return (
    <Box p={4}>
      <Heading size="lg" mb={6} textAlign="center">Эмчилгээний зөвшөөрлүүд</Heading>

      <SimpleGrid columns={{base: 1, md: 2, lg: 1 }} spacing={2}  justifyItems="center">
        {treatments.map((treatment) => (
          <Box
            key={treatment.PK}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            minH="50px"          
            maxW="600px"           
            w="100%"             
            _hover={{ bg: 'gray.50', cursor: 'pointer' }}
            onClick={() => handleOpen(treatment)}
            transition="all 0.2s"
            shadow="sm"
            display="flex"        
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontWeight="semibold" fontSize="md">{treatment.Title}</Text>
          </Box>

        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace="pre-wrap" mb={4}>{selected?.ConsentContent}</Text>

            <Checkbox
                isChecked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                colorScheme={checked ? 'green' : 'gray'}
                mb={4}
              >
              Би дээрх заавар, эрсдэлтэй танилцсан бөгөөд зөвшөөрч байна.
            </Checkbox>

            <Text fontWeight="semibold" mb={2}>Үйлчлүүлэгчийн гарын үсэг</Text>
            <Box border="1px" borderColor="gray.300" borderRadius="md" p={2}>
              <SignaturePad
                ref={(ref) => (sigPadRef.current = ref)}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signatureCanvas',
                  style: { borderRadius: '8px' },
                }}
              />
            </Box>
            <Button mt={2} onClick={handleClear} size="sm">Арилгах</Button>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Цуцлах</Button>
            <Button colorScheme="blue" onClick={handleSave}>Хадгалах</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const clinic = context.params?.cl as string;
  const personId = context.params?.pe as string;

  if (!clinic || !personId) {
    return { props: { treatments: [], tenantDB: null, personId: null } };
  }

  try {
    const pool = await getDbConnectionById(clinic);
    const result = await pool.request().query(`SELECT * FROM [${clinic}].[dbo].[cTreatmentConsent]`);

    const treatments = result.recordset.map((t: any) => ({
      ...t,
      CreatedDate: t.CreatedDate?.toISOString() ?? null,
    }));

    return {
      props: {
        treatments,
        tenantDB: clinic,
        personId: Number(personId),
      },
    };
  } catch (error) {
    return { props: { treatments: [], tenantDB: null, personId: null } };
  }
};