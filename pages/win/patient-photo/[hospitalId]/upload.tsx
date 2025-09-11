//pages/win/petient-photo/[hospitalid]/updload.tsx
import { Box, Button, Heading, Icon, Input, VStack } from "@chakra-ui/react";
import {
  useToast,
  Text,
  Image,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { uploadToS3 } from "@lib/file/data/uploadHooks";
import { useUploadHospitalPatientPhoto } from "@lib/hospital/data/hooks";
import { useCreatePhotoUploadToken } from "@lib/win/data/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiX } from "react-icons/fi";
type PhotoUploaderFormType = {
  photoUrl: string;
  isUploading: boolean;
};
const PatientPhotoUpload = () => {
  const router = useRouter();
  const { hospitalId, hospitalUserId } = router.query;
  const {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PhotoUploaderFormType>({
    defaultValues: {
      photoUrl: "",
      isUploading: false,
    },
  });
  watch("photoUrl", "isUploading");
  const uploadMutation = useUploadHospitalPatientPhoto();
  const createPhotoUploadTokenMutation = useCreatePhotoUploadToken(
    hospitalId as string,
    hospitalUserId as string
  );
  useEffect(() => {
    return createPhotoUploadTokenMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
          setToken(data.id);
        },
      }
    );
  }, [hospitalId as string, hospitalUserId as string]);

  const [token, setToken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const toast = useToast();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          status: "error",
          duration: 3000,
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    setValue("isUploading", true);
    console.log(getValues("isUploading"));
    console.log("file", selectedFile);
    if (!selectedFile) return;

    try {
      const imageUrl = await uploadToS3({
        file: selectedFile,
        setProgress: setImageUploadProgress,
      });
      setUploadedImages([...uploadedImages, imageUrl]);
      setValue("photoUrl", imageUrl);
      console.log("imageUrl", imageUrl);

      uploadMutation.mutate(
        {
          photoUrl: imageUrl,
          tokenId: token,
        },
        {
          onSuccess: () => {
            setValue("isUploading", false);
            toast({
              title: "Амжилттай",
              description: "Зураг амжилттай орууллаа",
              status: "success",
              duration: 3000,
            });
          },
          onError: () => {
            setValue("isUploading", false);
          },
        }
      );
    } catch (error) {
      console.error("Failed to upload image:", error);
      setValue("isUploading", false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return token == null ? (
    <Box>Уншиж байна...</Box>
  ) : (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Зураг авч оруулах</Heading>
        <VStack
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          p={6}
          textAlign="center"
          align="center"
          position="relative"
        >
          {previewUrl ? (
            <Box position="relative">
              <IconButton
                aria-label="Remove image"
                icon={<FiX />}
                position="absolute"
                right={-2}
                top={-2}
                size="sm"
                colorScheme="red"
                borderRadius="full"
                onClick={handleRemoveImage}
              />
              <Image
                src={previewUrl}
                alt="Preview"
                maxH="300px"
                mx="auto"
                mb={4}
              />
            </Box>
          ) : (
            <Icon as={FiImage} w={12} h={12} color="gray.400" mb={4} />
          )}

          <Input
            type="file"
            accept="image/*"
            display="none"
            id="file-upload"
            onChange={handleFileSelect}
          />
          <Button
            as="label"
            htmlFor="file-upload"
            colorScheme="blue"
            cursor="pointer"
          >
            Зураг сонгох
          </Button>
          <Text mt={2} color="gray.500" fontSize="sm">
            Дэмжих формат: JPG, PNG, GIF
          </Text>
        </VStack>

        <Button
          colorScheme="green"
          size="lg"
          onClick={handleUpload}
          isDisabled={!selectedFile}
          isLoading={uploadMutation.isLoading || getValues("isUploading")}
        >
          Зураг хуулах
        </Button>

        {uploadedImages.length > 0 && (
          <Box mt={8}>
            <Heading size="md" mb={4}>
              Оруулсан зургууд
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {uploadedImages.map((imageUrl, index) => (
                <Box key={index} position="relative">
                  <Image
                    src={imageUrl}
                    alt={`Uploaded image ${index + 1}`}
                    borderRadius="md"
                    maxH="200px"
                    w="100%"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default PatientPhotoUpload;
