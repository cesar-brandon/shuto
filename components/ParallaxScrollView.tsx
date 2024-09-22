import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { H4, Image, View, useTheme } from "tamagui";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HEADER_HEIGHT = 250;

type UserInfo = {
  username: string;
};

export default function ParallaxScrollView({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        setUserInfo(JSON.parse(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View flex={1} backgroundColor="$color2">
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: theme.accentColor.val,
            },
            headerAnimatedStyle,
          ]}
        >
          <Image
            source={{
              uri: require("@/assets/images/header-image.jpg"),
            }}
            style={styles.headerImage}
          />
          <View
            position="absolute"
            top={70}
            left={20}
            zIndex={2}
            flex={1}
            flexDirection="row"
          >
            <H4 color="$color3">Hola,</H4>
            <H4 color="$color1" fontStyle="italic">
              {userInfo.username}🌱
            </H4>
          </View>
        </Animated.View>
        <ThemedView
          style={[
            styles.content,
            {
              backgroundColor: theme.color2.val,
            },
          ]}
        >
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  headerImage: {
    height: "100%",
    width: "100%",
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 20,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -80,
  },
});
