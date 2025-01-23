import { Box, Button, Heading, Icon, Input, VStack } from "@chakra-ui/react";
import { useToast, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

const PatientPhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const toast = useToast();

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
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    // TODO: Implement actual upload logic here
    toast({
      title: "Success",
      description: "Photo uploaded successfully",
      status: "success",
      duration: 3000,
    });
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Patient Photo Upload</Heading>

        <Box
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          p={6}
          textAlign="center"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              maxH="300px"
              mx="auto"
              mb={4}
            />
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
            Select Photo
          </Button>
          <Text mt={2} color="gray.500" fontSize="sm">
            Supported formats: JPG, PNG, GIF
          </Text>
        </Box>

        <Button
          colorScheme="green"
          size="lg"
          onClick={handleUpload}
          isDisabled={!selectedFile}
        >
          Upload Photo
        </Button>
      </VStack>
    </Box>
  );
};

export default PatientPhotoUpload;
