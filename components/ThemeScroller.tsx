import React from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  View,
} from "react-native";

interface ThemeScrollerProps extends ScrollViewProps {
  children: React.ReactNode;
  onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | any;
  contentContainerStyle?: any;
  scrollEventThrottle?: number;
  headerSpace?: boolean;
}

export default function ThemedScroller({
  children,
  className,
  onScroll,
  contentContainerStyle,
  scrollEventThrottle = 16,
  headerSpace = false,
  ...props
}: ThemeScrollerProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: "100%" }}
      bounces={false}
      overScrollMode="never"
      className={`bg-light-primary dark:bg-dark-primary px-global flex-1 ${className || ""}`}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      contentContainerStyle={[
        headerSpace && { paddingTop: 70 }, // Add space for fixed header
        contentContainerStyle,
      ]}
      {...props}
    >
      {children}
      <View className="h-20 w-full" />
    </ScrollView>
  );
}

// Create an Animated version of ScrollView for use with Animated.event
export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
