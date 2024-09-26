import React from "react";
import { Button, Card, Image } from "tamagui";
import { PhotoOptions } from "./Options";
import { Photo } from "@/lib/types/photo";

export function PhotoCard({
  item,
  deleteItem,
}: {
  item: Photo;
  deleteItem: () => void;
}) {
  return (
    <PhotoOptions deleteItem={deleteItem} itemId={item.id}>
      <Card
        $sm={{ width: 150, height: 200 }}
        $xl={{ width: 200, height: 250 }}
        overflow="hidden"
        borderRadius="$7"
      >
        <Card.Footer padded>
          <Button
            width="100%"
            height="$3"
            fontSize="$3"
            borderRadius="$7"
            theme="active"
            disabled
          >
            {item.content.title}
          </Button>
        </Card.Footer>

        <Card.Background>
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
    </PhotoOptions>
  );
}

export function PhotoCardSkeleton() {
  return (
    <Card width={150} height={200} overflow="hidden">
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
