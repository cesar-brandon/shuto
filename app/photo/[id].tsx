import useImageStorage from "@/hooks/useImageStorage";
import { CornerUpLeft, Trash } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Text, View, XStack, YStack } from "tamagui";

export default function PhotoInfoScreen() {
  const { id } = useLocalSearchParams();
  const { getImage, image, deleteImage } = useImageStorage();

  useEffect(() => {
    getImage(id as string);
  }, [id]);

  if (!image) return <Text>Cargando...</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} gap="$5" padding="$4">
        <XStack justifyContent="space-between">
          <Button
            width="$4"
            icon={<CornerUpLeft />}
            onPress={() => router.back()}
          />
          <Button
            width="$4"
            backgroundColor="$red10Light"
            pressStyle={{
              backgroundColor: "$red10Dark",
            }}
            color="$red1Light"
            icon={<Trash />}
            onPress={() => {
              deleteImage(id as string);
              router.replace("/home");
            }}
          />
        </XStack>

        <XStack
          position="relative"
          padding="$2"
          borderRadius="$true"
          elevation="$3"
          backgroundColor="$color1"
        >
          <Image
            width="100%"
            $sm={{ height: 300 }}
            $xl={{ height: 400 }}
            borderRadius="$true"
            source={{ uri: image.image.uri || "" }}
            zIndex={0}
          />
        </XStack>
        <YStack gap="$2">
          <View
            width="auto"
            backgroundColor="$color3"
            padding="$3"
            borderRadius="$true"
          >
            <Text fontSize="$4" fontWeight="bold" textAlign="center">
              {image.content.title}
            </Text>
          </View>
          <Text fontSize="$3">{image.content.body}</Text>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
