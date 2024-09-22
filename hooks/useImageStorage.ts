import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import { useEffect, useState, useCallback } from "react";
import { Photo } from "@/lib/types/photo";

const useImageStorage = () => {
  const [images, setImages] = useState<Photo[]>([]);
  const [image, setImage] = useState<Photo | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const saveImage = useCallback(
    async (image: CameraCapturedPicture | null): Promise<boolean> => {
      if (!image) return false;
      setIsPending(true);
      try {
        const storedImages = JSON.parse(
          (await AsyncStorage.getItem("@images")) || "[]",
        );
        const newImage = {
          id: new Date().getTime().toString(),
          image,
          content: {
            title: "Test: Pagina Preview",
            body: "loremp ipsum dolor sit amet consectetur adipiscing elit",
          },
        };
        await AsyncStorage.setItem(
          "@images",
          JSON.stringify([...storedImages, newImage]),
        );
        setImages((prevImages) => [...prevImages, newImage]);
        return true;
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar la imagen");
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [],
  );

  const deleteImage = useCallback(async (id: string): Promise<void> => {
    setIsPending(true);
    try {
      setImages((prevImages) =>
        prevImages.filter((item: Photo) => item.id !== id),
      );
      await AsyncStorage.setItem(
        "@images",
        JSON.stringify(images.filter((item: Photo) => item.id !== id)),
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar la imagen");
    } finally {
      setIsPending(false);
    }
  }, []);

  const getImages = useCallback(async (): Promise<void> => {
    setIsPending(true);
    try {
      const storedImages = await AsyncStorage.getItem("@images");
      if (storedImages) {
        const parsedImages = JSON.parse(storedImages);
        const reversedImages = parsedImages.reverse();
        setImages(reversedImages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }, []);

  const getImage = useCallback(async (id: string): Promise<void> => {
    setIsPending(true);
    try {
      const storedImages = await AsyncStorage.getItem("@images");
      if (storedImages) {
        const parsedImages = JSON.parse(storedImages);
        const foundImage = parsedImages.find((item: Photo) => item.id === id);
        setImage(foundImage || null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return {
    saveImage,
    deleteImage,
    getImage,
    getImages,
    setImages,
    images,
    image,
    isPending,
  };
};

export default useImageStorage;
