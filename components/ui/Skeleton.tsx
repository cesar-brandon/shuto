import { usePulseAnimation } from "@/hooks/animations/usePulseAnimation";
import Animated from "react-native-reanimated";
import { useTheme } from "tamagui";

export function Skeleton({ style }: { style: any }) {
  const theme = useTheme();
  const animatedStyle = usePulseAnimation();

  return (
    <Animated.View
      style={[
        {
          borderRadius: 10,
          backgroundColor: theme.accentColor.val,
        },
        style,
        animatedStyle,
      ]}
    />
  );
}
