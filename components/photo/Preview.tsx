import { Button, Image, View, XStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { CameraCapturedPicture } from "expo-camera";

export function PhotoPreview({
  image,
  setImage,
}: {
  image: CameraCapturedPicture;
  setImage: (image: CameraCapturedPicture) => void;
}) {
  const handleUpload = () => {
    if (!image) return;
    console.log(image);
  };

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
          source={{ uri: image.uri || "" }}
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
          onPress={() =>
            setImage(
              // @ts-ignore
              null,
            )
          }
          themeInverse
        />
      </XStack>
      <Button onPress={handleUpload}>Confirmar</Button>
    </View>
  );
}
