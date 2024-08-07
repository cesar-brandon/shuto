import ParallaxScrollView from "@/components/ParallaxScrollView";
import { PhotoList } from "@/components/photo/List";

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <PhotoList />
    </ParallaxScrollView>
  );
}
