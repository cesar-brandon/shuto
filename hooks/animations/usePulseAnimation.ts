import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

export function usePulseAnimation() {
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

  return animatedStyle;
}
