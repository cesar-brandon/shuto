import { Button, Text, View } from "tamagui";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StyleSheet } from "react-native";
import { Flower, SwitchCamera, Zap, ZapOff } from "@tamagui/lucide-icons";
import { useState } from "react";

export default function ShotScreen() {
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera access is required to use this feature</Text>
        <Button onPress={requestPermission}>Request permission</Button>
      </View>
    );
  }

  function toggleCameraFlash() {
    setFlash((current) => (flash === "on" ? "off" : "on"));
  }

  function toggleCameraFacing() {
    setFacing((current) => (facing === "front" ? "back" : "front"));
  }

  return (
    <CameraView style={styles.camera} flash={flash} facing={facing}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={toggleCameraFlash}
          icon={flash === "on" ? <Zap size="$2" /> : <ZapOff size="$2" />}
        />
        <Button flex={1} alignSelf="flex-end" onPress={() => {}}>
          Take Picture
        </Button>
        <Button
          onPress={toggleCameraFacing}
          icon={<SwitchCamera size="$2" />}
        />
        <Flower flex={1} alignSelf="center" size={48} />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
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
