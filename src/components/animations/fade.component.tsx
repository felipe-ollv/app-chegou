import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  children: React.ReactNode;
  duration?: number;
};

export default function AnimatedField({
  visible,
  children,
  duration = 600,
}: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(10, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
