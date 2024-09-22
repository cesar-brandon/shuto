import { PhotoPreview, PhotoPreviewSkeleton } from "@/components/photo/Preview";
import useImageStorage from "@/hooks/useImageStorage";
import { Photo } from "@/lib/types/photo";

export default function PreviewScreen() {
  const { images } = useImageStorage();
  const lastImage = images[images.length - 1] as Photo;

  if (!lastImage) return <PhotoPreviewSkeleton />;

  return <PhotoPreview photo={lastImage} />;
}
