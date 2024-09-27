import useImageStorage from "@/hooks/useImageStorage";
import { CornerUpLeft, Trash } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, ScrollView, Text, View, XStack, YStack } from "tamagui";

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
            borderRadius="$7"
            icon={<CornerUpLeft size="$1" />}
            onPress={() => router.back()}
          />
          <Button
            backgroundColor="$red10Light"
            borderRadius="$7"
            pressStyle={{
              backgroundColor: "$red10Dark",
            }}
            color="$red1Light"
            icon={<Trash size="$1" />}
            onPress={() => {
              deleteImage(id as string);
              router.push("/home");
            }}
          />
        </XStack>

        <XStack
          position="relative"
          padding="$2"
          borderRadius="$7"
          elevation="$3"
          backgroundColor="$color1"
        >
          <Image
            width="100%"
            $sm={{ height: 300 }}
            $xl={{ height: 400 }}
            borderRadius="$6"
            source={{ uri: image.image.uri || "" }}
            zIndex={0}
          />
        </XStack>
        <YStack gap="$3">
          <View
            width="auto"
            backgroundColor="$color3"
            padding="$3"
            borderRadius="$7"
          >
            <Text fontSize="$4" fontWeight="bold" textAlign="center">
              {image.content.title}
            </Text>
          </View>
          <ScrollView
            maxHeight={250}
            width="100%"
            backgroundColor="$background"
            padding="$4"
            borderRadius="$7"
            borderWidth={1}
            borderColor="$color3"
          >
            <Text fontSize="$3">{image.content.body}</Text>
          </ScrollView>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
