import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, useTheme } from "tamagui";
import { PhotoList } from "@/components/PhotoList";

export default function HomeScreen() {
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
      <PhotoList />
    </ParallaxScrollView>
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
