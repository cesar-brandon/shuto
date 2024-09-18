import React from "react";
import { Button, Card, Image } from "tamagui";
import { PhotoOptions } from "./Options";

export function PhotoCard({
  item,
  deleteItem,
}: {
  item: {
    title: string;
    image: string;
  };
  deleteItem: () => void;
}) {
  return (
    <PhotoOptions deleteItem={deleteItem}>
      <Card width={150} height={200} overflow="hidden">
        <Card.Footer padded>
          <Button
            width="100%"
            height="$3"
            fontSize="$3"
            borderRadius="$4"
            theme="active"
            disabled
          >
            {item.title}
          </Button>
        </Card.Footer>

        <Card.Background>
          <Image
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
              uri: item.image,
            }}
          />
        </Card.Background>
      </Card>
    </PhotoOptions>
  );
}
