import { Button, Image, View, XStack } from "tamagui";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";
import { StyleSheet } from "react-native";
import {
  Camera,
  CornerUpLeft,
  Disc,
  Flashlight,
  FlashlightOff,
  Sprout,
  Trash,
  X,
  Zap,
  ZapOff,
} from "@tamagui/lucide-icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";

export default function ShotScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [torch, setTorch] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

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
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (!photo) return;
        setImage(photo.uri);
      } catch (error) {
        console.log("ERROR_TAKE_PICTURE", error);
      }
    }
  };

  return (
    <>
      {!image ? (
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
                <Button
                  width={50}
                  icon={<CornerUpLeft size="$1" />}
                  themeInverse
                />
              </Link>
              <XStack gap="$2">
                <Button
                  width={50}
                  onPress={toggleCameraFlash}
                  icon={
                    flash === "on" ? <Zap size="$1" /> : <ZapOff size="$1" />
                  }
                  themeInverse
                />
                <Button
                  width={50}
                  onPress={toggleTorch}
                  icon={
                    torch ? (
                      <Flashlight size="$1" />
                    ) : (
                      <FlashlightOff size="$1" />
                    )
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
              <View
                borderRadius="$10"
                borderWidth={2}
                borderColor="$color3"
                width={250}
                height={250}
                alignSelf="center"
                justifyContent="center"
                padding={10}
                opacity={0.2}
              >
                <Sprout color="$color3" flex={1} alignSelf="center" size={48} />
              </View>
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
      ) : (
        <View flex={1} justifyContent="center" alignItems="center" gap="$10">
          <XStack
            position="relative"
            padding="$2"
            borderRadius="$true"
            elevation="$3"
            backgroundColor="$color1"
          >
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300, borderRadius: 10 }}
              zIndex={0}
            />
            <Button
              size="$3"
              position="absolute"
              top="$3"
              right="$3"
              zIndex={1}
              icon={<X size="$1" />}
              onPress={() => setImage(null)}
              themeInverse
            />
          </XStack>
          <Button onPress={() => {}}>Confirmar</Button>
        </View>
      )}
    </>
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
