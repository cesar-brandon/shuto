import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "tamagui";

export function Skeleton({ style }: { style: any }) {
  const theme = useTheme();
  const pulse = useSharedValue(1);

  pulse.value = withRepeat(
    withTiming(0.5, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pulse.value,
    };
  });

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
