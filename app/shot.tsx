import { Button, View, XStack } from "tamagui";
import {
  CameraView,
  useCameraPermissions,
  FlashMode,
  CameraCapturedPicture,
} from "expo-camera";
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
import { Link } from "expo-router";
import { PhotoPreview } from "@/components/photo/Preview";

export default function ShotScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [torch, setTorch] = useState(false);
  const [image, setImage] = useState<CameraCapturedPicture>();

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
        setImage(photo);
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
        <PhotoPreview image={image} setImage={setImage} />
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
