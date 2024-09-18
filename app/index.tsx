import { AnimatedIntro } from "@/components/AnimatedIntro";
import BottomLoginSheet from "@/components/BottomLoginSheet";
import { Image, View } from "tamagui";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AnimatedIntro />
      <View
        width="90%"
        height="30%"
        position="absolute"
        left="5%"
        bottom={130}
        display="flex"
        alignItems="center"
        overflow="hidden"
        borderRadius="$6"
      >
        <Image
          source={{
            uri: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJ4NDlvbTBnb2Fkcml4ZHZhb3k0YWg4bDZhM2pnZHJicTlqN2VjNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KXECBV0GkdCX6/giphy.gif",
          }}
          width="100%"
          height="100%"
        />
      </View>
      <BottomLoginSheet />
    </View>
  );
}
