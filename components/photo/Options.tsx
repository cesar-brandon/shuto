import { Eye, Trash } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  YStack,
} from "tamagui";

export function PhotoOptions({
  children,
  deleteItem,
}: {
  children: React.ReactNode;

  deleteItem: () => void;
}) {
  return (
    <Popover size="$3" placement="top" allowFlip>
      <PopoverTrigger asChild opacity="unset">
        {children}
      </PopoverTrigger>
      <PopoverContent
        borderWidth={0}
        borderColor="$borderColor"
        backgroundColor="$color3"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        top="$18"
      >
        <PopoverArrow size="$4" backgroundColor="$color3" />
        <YStack gap="$2">
          <Button alignSelf="center" icon={<Eye size="$1" />} width="$11">
            Observar
          </Button>
          <Button
            onPress={deleteItem}
            alignSelf="center"
            icon={<Trash size="$1" />}
            themeInverse
          >
            Eliminar
          </Button>
        </YStack>
      </PopoverContent>
    </Popover>
  );
}
