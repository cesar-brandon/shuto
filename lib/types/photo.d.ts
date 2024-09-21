import { CameraCapturedPicture } from "expo-camera";

export type Photo = {
  id: string;
  image: CameraCapturedPicture;
  content: {
    title: string;
    body: string;
  };
};
