import { PhotoPreview, PhotoPreviewSkeleton } from "@/components/photo/Preview";
import { Photo } from "@/lib/types/photo";
import { convertImageToBase64 } from "@/lib/utils/image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PreviewScreen() {
  const { uri, width, height } = useLocalSearchParams();
  const [photoPreview, setPhotoPreview] = useState<Photo | null>({
    id: new Date().getTime().toString(),
    image: {
      uri: uri as string,
      width: Number(width),
      height: Number(height),
    },
    content: {
      title: "",
      body: "",
    },
  });
  const [base64Image, setBase64Image] = useState<string | null>(null);

  if (!photoPreview) return <PhotoPreviewSkeleton />;

  useEffect(() => {
    async function convertImage() {
      if (!photoPreview) return;
      const convertedImage = await convertImageToBase64(photoPreview.image.uri);
      setBase64Image(convertedImage);
    }
    convertImage();
  }, [photoPreview]);

  return (
    <PhotoPreview
      photoPreview={photoPreview}
      setPhotoPreview={setPhotoPreview}
      base64Image={base64Image}
    />
  );
}
