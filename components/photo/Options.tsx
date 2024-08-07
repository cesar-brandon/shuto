import { Pencil, Trash } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "tamagui";

export function PhotoOptions() {
  return (
    <Popover size="$5" placement="bottom" allowFlip>
      <PopoverTrigger asChild>
        <Button width={10} icon={<Pencil size="$1" />} />
      </PopoverTrigger>
      <Adapt when="sm" platform="touch">
        <Popover.Sheet dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <PopoverContent
        height={50}
        borderWidth={1}
        borderColor="$borderColor"
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
      >
        <PopoverArrow borderWidth={1} borderColor="$borderColor" />
        <Button
          alignSelf="center"
          color="$color1"
          backgroundColor="$color11"
          icon={<Trash size="$1" />}
        >
          Eliminar
        </Button>
      </PopoverContent>
    </Popover>
  );
}
