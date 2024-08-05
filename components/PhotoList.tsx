import type { CardProps } from "tamagui";
import { Button, Card, H2, Image, Paragraph, XStack, YStack } from "tamagui";

//NOTE: intentar: $sm={{ flexDirection: "column" }}
export function PhotoList() {
  return (
    <XStack flex={1} flexWrap="wrap" gap="$4" justifyContent="center">
      {Array.from({ length: 10 }).map((_, i) => (
        <PhotoCard key={i} />
      ))}
    </XStack>
  );
}

export function PhotoCard(props: CardProps) {
  return (
    <Card size="$10" borderRadius="$10" overflow="hidden" {...props}>
      <Card.Header padded>
        <H2>Sony A7IV</H2>
        <Paragraph theme="alt2">Now available</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>
      <Card.Background>
        <Image
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: "https://i.pinimg.com/564x/a2/4c/f8/a24cf8573f5dd7a08591134530e12134.jpg",
          }}
        />
      </Card.Background>
    </Card>
  );
}
