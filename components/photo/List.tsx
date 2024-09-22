import { XStack } from "tamagui";
import { PhotoCard, PhotoCardSkeleton } from "./Card";
import useImageStorage from "@/hooks/useImageStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Photo } from "@/lib/types/photo";
import { Alert } from "react-native";

//NOTE: intentar: $sm={{ flexDirection: "column" }}
export function PhotoList({
  isPending,
  images,
  deleteImage,
}: {
  isPending: boolean;
  images: Photo[];
  deleteImage: (id: string) => void;
}) {
  if (!images) return null;

  return (
    <XStack
      flex={1}
      flexWrap="wrap"
      gap="$4"
      justifyContent="center"
      marginBottom="$12"
    >
      {isPending ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <PhotoCardSkeleton key={index} />
          ))}
        </>
      ) : (
        images.map((item) => (
          <PhotoCard
            key={item.id}
            item={item}
            deleteItem={() => deleteImage(item.id)}
          />
        ))
      )}
    </XStack>
  );
}
