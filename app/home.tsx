import { StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import type { CardProps } from "tamagui";
import { Button, Card, H2, Image, Paragraph, XStack, useTheme } from "tamagui";

export default function TabTwoScreen() {
  const theme = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: theme.background.val,
        dark: theme.background.val,
      }}
      headerImage={
        <Image
          source={{
            uri: "https://dr.savee-cdn.com/things/6/0/25614cc83151491ef6e387.webp",
          }}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenido!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tus capturas:</ThemedText>
      </ThemedView>
      <XStack $sm={{ flexDirection: "column" }} paddingHorizontal="$4" space>
        <DemoCard
          animation="bouncy"
          size="$4"
          width={250}
          height={300}
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
        />
        <DemoCard size="$5" width={250} height={300} />
      </XStack>
    </ParallaxScrollView>
  );
}

export function DemoCard(props: CardProps) {
  return (
    <Card elevate size="$4" bordered {...props}>
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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
