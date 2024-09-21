import { XStack } from "tamagui";
import { PhotoCard, PhotoCardSkeleton } from "./Card";
import { useEffect, useState } from "react";
import { Photo } from "@/lib/types/photo";
import AsyncStorage from "@react-native-async-storage/async-storage";

//NOTE: intentar: $sm={{ flexDirection: "column" }}
export function PhotoList() {
  const [list, setList] = useState<Photo[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  const deleteItem = (id: string) => {
    setList(list.filter((item) => item.id !== id));
    AsyncStorage.setItem(
      "@images",
      JSON.stringify(list.filter((item) => item.id !== id)),
    );
  };

  const getImages = async () => {
    setIsPending(true);
    try {
      const images = await AsyncStorage.getItem("@images");
      if (images) {
        setList(JSON.parse(images));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getImages();
  }, [AsyncStorage.setItem]);

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
        list.map((item) => (
          <PhotoCard
            key={item.id}
            item={item}
            deleteItem={() => deleteItem(item.id)}
          />
        ))
      )}
    </XStack>
  );
}
