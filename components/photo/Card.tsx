import React from "react";
import { Button, Card, Image, Text } from "tamagui";
import { PhotoOptions } from "./Options";
import { Photo } from "@/lib/types/photo";
import { router } from "expo-router";

export function PhotoCard({
  item,
  deleteItem,
}: {
  item: Photo;
  deleteItem: () => void;
}) {
  return (
    // <PhotoOptions deleteItem={deleteItem} itemId={item.id}>
    <Card
      $sm={{ width: 150, height: 220 }}
      $xl={{ width: 200, height: 250 }}
      overflow="hidden"
      borderRadius="$10"
      onPress={() => {
        router.push(`/photo/${item.id}`);
      }}
    >
      <Card.Footer>
        <Text width="100%" height="$3" fontSize="$3" textAlign="center">
          {item.content.title.length > 14
            ? item.content.title.slice(0, 14) + "..."
            : item.content.title}
        </Text>
      </Card.Footer>

      <Card.Background height={170} borderRadius="$10">
        <Image
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: item.image.uri,
          }}
        />
      </Card.Background>
    </Card>
    // </PhotoOptions>
  );
}

export function PhotoCardSkeleton() {
  return (
    <Card width={150} height={220} overflow="hidden">
      <Card.Footer padded>
        <Button
          width="100%"
          height="$3"
          fontSize="$3"
          borderRadius="$7"
          theme="active"
          disabled
        />
      </Card.Footer>
      <Card.Background backgroundColor="$color3" />
    </Card>
  );
}
