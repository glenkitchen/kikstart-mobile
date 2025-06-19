import { useThemeColors } from "@/contexts/ThemeColors";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/global.css";
import useThemedNavigation from "@/hooks/useThemedNavigation";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function ThemedLayout() {
  const colors = useThemeColors();
  const { ThemedStatusBar } = useThemedNavigation();

  return (
    <>
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.bg,
          },
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="(screens)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      className={`bg-light-primary dark:bg-dark-primary ${Platform.OS === "ios" ? "pb-0 " : ""}`}
      style={{ flex: 1 }}
    >
      <ThemeProvider>
        <ThemedLayout />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
