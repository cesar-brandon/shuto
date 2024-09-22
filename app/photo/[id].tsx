import useImageStorage from "@/hooks/useImageStorage";
import { Photo } from "@/lib/types/photo";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "tamagui";

export default function PhotoInfoScreen() {
  const { id } = useLocalSearchParams();
  const { getImage, image } = useImageStorage();

  useEffect(() => {
    getImage(id as string);
  }, [id]);

  return (
    <Text>{image ? image.content.title : "No se encontró la imagen"}</Text>
  );
}
