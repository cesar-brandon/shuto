import { generateReactNativeHelpers } from "@uploadthing/expo";
import type { UploadRouter } from "../app/api/uploadthing+api";

export const { useImageUploader, useDocumentUploader } =
  generateReactNativeHelpers<UploadRouter>();
