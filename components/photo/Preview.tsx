import { Button, Image, View, XStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { CameraCapturedPicture } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export function PhotoPreview({
  image,
  setImage,
}: {
  image: CameraCapturedPicture;
  setImage: (image: CameraCapturedPicture) => void;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const saveImage = async () => {
    if (!image) return;
    setIsPending(true);
    try {
      await AsyncStorage.setItem(
        "@images",
        JSON.stringify([
          ...JSON.parse((await AsyncStorage.getItem("@images")) || "[]"),
          {
            id: new Date().getTime(),
            image,
            content: {
              title: "Titulo de prueba",
              body: "loremp ipsum dolor sit amet consectetur adipiscing elit",
            },
          },
        ]),
      );
      setImage(null as unknown as CameraCapturedPicture);
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la imagen");
    } finally {
      setIsPending(false);
    }
  };

  const getImages = async () => {
    try {
      const images = await AsyncStorage.getItem("@images");
      if (images) {
        console.log(JSON.parse(images));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, [image]);

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
          onPress={() => setImage(null as unknown as CameraCapturedPicture)}
          themeInverse
        />
      </XStack>
      <Button
        onPress={saveImage}
        disabled={isPending}
        opacity={isPending ? 0.5 : 1}
      >
        {isPending ? "Guardando..." : "Guardar"}
      </Button>
    </View>
  );
}
