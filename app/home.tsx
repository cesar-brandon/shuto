import ParallaxScrollView from "@/components/ParallaxScrollView";
import { PhotoList } from "@/components/photo/List";
import useImageStorage from "@/hooks/useImageStorage";
import { Sprout } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "tamagui";
import { PortalProvider } from "@tamagui/portal";

export default function HomeScreen() {
  const { isPending, images, deleteImage } = useImageStorage();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsPopoverOpen(images.length === 0);
  }, [images]);

  return (
    <PortalProvider shouldAddRootHost>
      <ParallaxScrollView>
        <PhotoList
          images={images}
          isPending={isPending}
          deleteImage={deleteImage}
        />
      </ParallaxScrollView>
      <View
        display={!isPending && isPopoverOpen ? "flex" : "none"}
        position="absolute"
        width="80%"
        left={"10%"}
        bottom={90}
        backgroundColor="$color1"
        borderRadius="$7"
      >
        <Text
          textAlign="center"
          color="$color10"
          fontSize="$3"
          fontWeight="bold"
          paddingVertical={20}
        >
          Empieza a tomar fotos de tus plantas
        </Text>
      </View>

      <Link href="/shot" asChild>
        <Button
          width={60}
          height={60}
          position="absolute"
          left={"50%"}
          transform={[{ translateX: -30 }]}
          bottom={20}
          backgroundColor="$accentColor"
          borderRadius="$7"
          pressStyle={{
            borderWidth: 0,
            backgroundColor: "$accentColor",
          }}
          icon={<Sprout color="$color2" size="$2" />}
          zIndex={2}
        />
      </Link>
    </PortalProvider>
  );
}
