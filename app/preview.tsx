import { PhotoPreview } from "@/components/photo/Preview";
import { Photo } from "@/lib/types/photo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function PreviewScreen() {
  const [lastImage, setLastImage] = useState<Photo>();

  const getImages = async () => {
    try {
      const images = await AsyncStorage.getItem("@images");
      if (images) {
        const parsedImages = JSON.parse(images);
        setLastImage(parsedImages[parsedImages.length - 1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  if (!lastImage) return null;

  return <PhotoPreview photo={lastImage} />;
}
