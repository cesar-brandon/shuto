import * as FileSystem from "expo-file-system";

async function convertImageToBase64(imageUri: string): Promise<string> {
  try {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Image;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
}

async function convertImageToBinary(imageUri: string): Promise<Uint8Array> {
  try {
    const utf8Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const binaryImage = new Uint8Array(
      utf8Image.split("").map((char) => char.charCodeAt(0)),
    );
    return binaryImage;
  } catch (error) {
    console.error("Error converting image to binary:", error);
    throw error;
  }
}

export { convertImageToBase64, convertImageToBinary };
