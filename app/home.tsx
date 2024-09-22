import ParallaxScrollView from "@/components/ParallaxScrollView";
import { PhotoList } from "@/components/photo/List";
import useImageStorage from "@/hooks/useImageStorage";
import { Sprout } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Popover, PortalProvider, Text } from "tamagui";

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
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        size="$5"
        placement="top"
      >
        <Popover.Trigger asChild>
          <Link href="/shot" asChild>
            <Button
              width={60}
              height={60}
              position="absolute"
              left={"50%"}
              transform={[{ translateX: -30 }]}
              bottom={20}
              backgroundColor="$accentColor"
              pressStyle={{
                borderWidth: 0,
                backgroundColor: "$accentColor",
                opacity: 0.8,
              }}
              icon={<Sprout color="$color2" size="$4" />}
              zIndex={2}
            />
          </Link>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
          <Text>Empieza a tomar fotos de tus plantas</Text>
        </Popover.Content>
      </Popover>
    </PortalProvider>
  );
}
