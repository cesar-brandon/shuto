import { Button, View, XStack } from "tamagui";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";
import { StyleSheet } from "react-native";
import {
  Camera,
  CornerUpLeft,
  Disc,
  Flashlight,
  FlashlightOff,
  Sprout,
  Zap,
  ZapOff,
} from "@tamagui/lucide-icons";
import { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import useImageStorage from "@/hooks/useImageStorage";

export default function ShotScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [torch, setTorch] = useState(false);
  const [focusBackground, setFocusBackground] = useState({
    backgroundColor: "transparent",
    opacity: 0.2,
  });
  const [isPending, setIsPending] = useState(false);
  const { saveImage } = useImageStorage();
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (!isPending) return;

    const interval = setInterval(() => {
      setFocusBackground((prev) =>
        prev.opacity === 1
          ? { backgroundColor: "$color3", opacity: 0.5 }
          : { backgroundColor: "transparent", opacity: 1 },
      );
    }, 500);

    return () => clearInterval(interval);
  }, [isPending]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View flex={1} justifyContent="center">
        <Button
          alignSelf="center"
          onPress={requestPermission}
          icon={<Camera size="$2" />}
        >
          Pedir permiso
        </Button>
      </View>
    );
  }

  const toggleCameraFlash = () => {
    setFlash((prev) => (prev === "on" ? "off" : "on"));
  };

  const toggleTorch = () => {
    setTorch((prev) => !prev);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsPending(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (!photo) return;
        const result = await saveImage(photo);
        if (result) {
          router.push("/preview");
        }
      } catch (error) {
        console.log("ERROR_TAKE_PICTURE", error);
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <CameraView
      ref={cameraRef}
      style={styles.camera}
      flash={flash}
      enableTorch={torch}
    >
      <View flex={1}>
        <View
          flex={1}
          flexDirection="row"
          justifyContent="space-between"
          gap="$2"
          marginTop={50}
          marginLeft={40}
          marginRight={40}
        >
          <Link href="/home" asChild>
            <Button width={50} icon={<CornerUpLeft size="$1" />} themeInverse />
          </Link>
          <XStack gap="$2">
            <Button
              width={50}
              onPress={toggleCameraFlash}
              icon={flash === "on" ? <Zap size="$1" /> : <ZapOff size="$1" />}
              themeInverse
            />
            <Button
              width={50}
              onPress={toggleTorch}
              icon={
                torch ? <Flashlight size="$1" /> : <FlashlightOff size="$1" />
              }
              themeInverse
            />
          </XStack>
        </View>
        <View
          position="absolute"
          width="100%"
          height="100%"
          flex={1}
          flexDirection="row"
          justifyContent="center"
        >
          <XStack
            borderRadius="$10"
            borderWidth={2}
            borderColor="$color3"
            width={250}
            height={250}
            alignSelf="center"
            justifyContent="center"
            padding={10}
            opacity={focusBackground.opacity}
            backgroundColor={focusBackground.backgroundColor}
            animation={{
              backgroundColor: "lazy",
            }}
          >
            <Sprout color="$color3" flex={1} alignSelf="center" size={48} />
          </XStack>
        </View>

        <View
          position="absolute"
          bottom={40}
          width="100%"
          flex={1}
          flexDirection="row"
          justifyContent="center"
        >
          <Button
            width={60}
            height={60}
            icon={<Disc size="$3" opacity={0.5} />}
            borderRadius="$10"
            onPress={takePicture}
          />
        </View>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
