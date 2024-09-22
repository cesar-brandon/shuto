import { Button, Image, View, XStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import useImageStorage from "@/hooks/useImageStorage";
import { Photo } from "@/lib/types/photo";
import { router } from "expo-router";

export function PhotoPreview({ photo }: { photo: Photo }) {
  const { deleteImage } = useImageStorage();

  return (
    <View flex={1} justifyContent="center" alignItems="center" gap="$10">
      <XStack
        position="relative"
        padding="$2"
        borderRadius="$true"
        elevation="$3"
        backgroundColor="$color1"
      >
        <Image
          source={{ uri: photo.image.uri || "" }}
          style={{ width: 300, height: 300, borderRadius: 10 }}
          zIndex={0}
        />
        <Button
          size="$3"
          position="absolute"
          top="$3"
          right="$3"
          zIndex={1}
          icon={<X size="$1" />}
          onPress={() => {
            deleteImage(photo.id);
            router.back();
          }}
          themeInverse
        />
      </XStack>
      {/* <Button */}
      {/*   onPress={() => router.push("/preview")} */}
      {/*   disabled={isPending} */}
      {/*   opacity={isPending ? 0.5 : 1} */}
      {/* > */}
      {/*   {isPending ? "Guardando..." : "Guardar"} */}
      {/* </Button> */}
      <Button onPress={() => router.navigate("/home")}>Inicio</Button>
    </View>
  );
}
