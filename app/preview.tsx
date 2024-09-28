import { PhotoPreview, PhotoPreviewSkeleton } from "@/components/photo/Preview";
import { Photo } from "@/lib/types/photo";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

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

  if (!photoPreview) return <PhotoPreviewSkeleton />;

  return (
    <PhotoPreview
      photoPreview={photoPreview}
      setPhotoPreview={setPhotoPreview}
    />
  );
}
