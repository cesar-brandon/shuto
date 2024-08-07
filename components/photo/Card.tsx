import { Button, Card, CardProps, Image, XStack } from "tamagui";
import { PhotoOptions } from "./Options";

export function PhotoCard({
  item,
}: {
  item: {
    title: string;
    image: string;
  };
}) {
  return (
    <Card width={150} height={200} overflow="hidden">
      <Card.Header padded alignItems="flex-end">
        <PhotoOptions />
      </Card.Header>

      <Card.Footer padded>
        <XStack flex={1} />
        <Button style={{ width: "100%" }} borderRadius="$10">
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
  );
}
