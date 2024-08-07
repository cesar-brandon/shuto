import { Button, View } from "tamagui";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StyleSheet } from "react-native";
import {
  Camera,
  CornerUpLeft,
  Sprout,
  Zap,
  ZapOff,
} from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function ShotScreen() {
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [permission, requestPermission] = useCameraPermissions();

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

  function toggleCameraFlash() {
    setFlash((current) => (flash === "on" ? "off" : "on"));
  }

  return (
    <CameraView style={styles.camera} flash={flash}>
      <View flex={1}>
        <View
          flex={1}
          flexDirection="row"
          gap="$2"
          marginTop={30}
          marginLeft={40}
        >
          <Link href="/home" asChild>
            <Button width={50} icon={<CornerUpLeft size="$2" />} />
          </Link>
          <Button
            width={50}
            onPress={toggleCameraFlash}
            icon={flash === "on" ? <Zap size="$2" /> : <ZapOff size="$2" />}
          />
        </View>
        <View
          borderRadius="$10"
          borderWidth={1}
          borderColor="$color3"
          width={250}
          height={250}
          alignSelf="center"
          justifyContent="center"
          padding={10}
        >
          <Sprout color="$color3" flex={1} alignSelf="center" size={48} />
        </View>

        <View style={styles.buttonContainer}>
          <Button flex={1} alignSelf="flex-end" onPress={() => {}}>
            Tomar la foto
          </Button>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
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
