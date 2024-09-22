import { Button, Image, Square, Text, View, XStack, YStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import useImageStorage from "@/hooks/useImageStorage";
import { Photo } from "@/lib/types/photo";
import { router } from "expo-router";
import { Skeleton } from "../ui/Skeleton";
import { useTheme } from "tamagui";

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
      <YStack gap="$2">
        <View
          width="auto"
          backgroundColor="$color3"
          padding="$3"
          borderRadius="$true"
        >
          <Text fontSize="$4" fontWeight="bold" textAlign="center">
            {photo.content.title}
          </Text>
        </View>
        <Text fontSize="$3">{photo.content.body}</Text>
      </YStack>
      <Button onPress={() => router.replace("/home")}>Volver Inicio</Button>
    </View>
  );
}

export function ImageSkeleton() {
  const theme = useTheme();
  return (
    <XStack
      position="relative"
      padding="$2"
      borderRadius="$true"
      elevation="$3"
      backgroundColor="$color1"
    >
      <Skeleton
        style={{
          width: 300,
          height: 300,
          backgroundColor: theme.accentColor.val,
        }}
      />
    </XStack>
  );
}
export function BodySkeleton() {
  const theme = useTheme();
  return (
    <YStack gap="$4" alignItems="center">
      <Skeleton
        style={{
          width: 200,
          height: 45,
          backgroundColor: theme.color3.val,
        }}
      />

      <YStack gap="$2" alignItems="center">
        <Skeleton
          style={{
            width: 300,
            height: 20,
            backgroundColor: theme.color3.val,
          }}
        />
        <Skeleton
          style={{
            width: 300,
            height: 20,
            backgroundColor: theme.color3.val,
          }}
        />
        <Skeleton
          style={{
            width: 200,
            height: 20,
            backgroundColor: theme.color3.val,
          }}
        />
      </YStack>
    </YStack>
  );
}

export function PhotoPreviewSkeleton() {
  return (
    <View flex={1} justifyContent="center" alignItems="center" gap="$10">
      <ImageSkeleton />
      <BodySkeleton />
    </View>
  );
}
