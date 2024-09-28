import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Form,
  H4,
  Input,
  Spinner,
  View,
  XStack,
  useTheme,
} from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { ChevronRight } from "@tamagui/lucide-icons";

type UserInfo = {
  username: string;
};

const BottomLoginSheet = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  const router = useRouter();

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

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("@user", JSON.stringify({ username }));
      setUserInfo({ username });
      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {userInfo && userInfo.username ? (
        <Link href="/home" asChild>
          <XStack
            position="relative"
            width="98%"
            borderRadius="$7"
            borderWidth={1}
            borderColor="$color6"
            backgroundColor="$color2"
            paddingHorizontal="$6"
            paddingVertical="$3"
            alignItems="center"
            justifyContent="center"
            gap="$4"
            overflow="hidden"
            pressStyle={{ scale: 1.05 }}
          >
            {/* <View */}
            {/*   width={45} */}
            {/*   height={45} */}
            {/*   backgroundColor="$color3" */}
            {/*   borderRadius={30} */}
            {/*   overflow="hidden" */}
            {/*   alignItems="center" */}
            {/*   justifyContent="center" */}
            {/* > */}
            {/*   <Text fontSize="$5" color="$color10" fontWeight="bold"> */}
            {/*     {userInfo.username && */}
            {/*       userInfo.username */}
            {/*         .split(" ") */}
            {/*         .slice(0, 2) */}
            {/*         .map((word) => word[0].toUpperCase()) */}
            {/*         .join("")} */}
            {/*   </Text> */}
            {/* </View> */}
            <H4 color="$color10" fontWeight="bold" marginBottom="$1">
              {userInfo.username}
            </H4>
            {/* <ArrowRightCircle size={24} color={theme.color10.val} /> */}
            <ChevronRight size={24} color={theme.color10.val} />
          </XStack>
        </Link>
      ) : (
        <Form
          alignItems="center"
          minWidth={300}
          gap="$2"
          onSubmit={onSubmit}
          borderRadius="$6"
          backgroundColor="$color2"
          paddingHorizontal="$6"
          paddingVertical="$8"
        >
          <XStack alignItems="center" space="$2">
            <Input
              flex={1}
              maxLength={20}
              size="$4"
              placeholder="Tu nombre"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />

            <Form.Trigger disabled={isLoading} asChild>
              <Button icon={isLoading === true ? () => <Spinner /> : undefined}>
                Ingresar
              </Button>
            </Form.Trigger>
          </XStack>
        </Form>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 80,
    borderRadius: 20,
    marginHorizontal: "5%",
    gap: 14,
  },
});
export default BottomLoginSheet;
