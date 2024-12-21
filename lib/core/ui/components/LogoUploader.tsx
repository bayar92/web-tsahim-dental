import { Box, Input, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { uploadToS3 } from "@lib/file/data/uploadHooks";
import { useUpdateHospitalLogo } from "@lib/hospital/data/hooks";

import Compressor from "compressorjs";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type LogoUploaderFormType = {
  photoUrl: string;
  isUploading: boolean;
};

interface ImageCompressorConfig {
  quality: number;
  maxHeight: number;
  maxWidth: number;
  mimeType: string;
  success: (result: File) => void;
}

const DEFAULT_COMPRESSOR_CONFIG: ImageCompressorConfig = {
  quality: 0.8,
  maxHeight: 1024,
  maxWidth: 1024,
  mimeType: "image/jpeg",
  success: () => {},
};

export const LogoUploader = ({
  setLogoUrl,
}: {
  setLogoUrl: (url: string) => void;
}) => {
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
  } = useForm<LogoUploaderFormType>({
    defaultValues: {
      photoUrl: "",
      isUploading: false,
    },
  });
  const updateHospitalLogo = useUpdateHospitalLogo();
  watch(["photoUrl"]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [imgFile, setImgFile] = useState<File>();
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const handleImageCompression = (image: File) => {
    const config: ImageCompressorConfig = {
      ...DEFAULT_COMPRESSOR_CONFIG,
      success: (compressedResult) => {
        setImgFile(compressedResult as File);
        handleUpload(compressedResult as File);
      },
    };

    new Compressor(image, config);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageCompression(file);
    } else {
      setValue("photoUrl", "");
    }
  };
  const handleUpload = async (file: File) => {
    setValue("isUploading", true);
    console.log("file", file);
    if (!file) return;

    try {
      const imageUrl = await uploadToS3({
        file: file,
        setProgress: setImageUploadProgress,
      });
      setLogoUrl(imageUrl);
      setValue("photoUrl", imageUrl);
      setValue("isUploading", false);
      updateHospitalLogo.mutate({
        logoUrl: imageUrl,
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
      setValue("isUploading", false);
    }
  };

  const clearInputs = () => {
    setValue("photoUrl", "");
    // if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleShowImageUploader = () => {
    cameraInputRef?.current?.click();
    clearInputs();
  };

  const handleModalClose = () => {
    clearInputs();
    onClose();
  };

  const finalRef = React.useRef(null);

  return (
    <Box w="full">
      <Input
        display="none"
        type="file"
        size="sm"
        ref={cameraInputRef}
        onChange={handleFileChange}
        multiple={false}
        accept="image/jpeg, image/png, image/jpg"
      />
      <Text
        whiteSpace={"nowrap"}
        variant={"solid"}
        cursor={"pointer"}
        size={"sm"}
        fontWeight="400"
        fontSize="12px"
        onClick={handleShowImageUploader}
      >
        Лого солих{" "}
        <Spinner
          size="xs"
          visibility={getValues("isUploading") ? "visible" : "hidden"}
        />
      </Text>
    </Box>
  );
};
