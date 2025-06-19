import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useThemeColors } from "../contexts/ThemeColors";
import { useTheme } from "../contexts/ThemeContext";

export default function useThemedNavigation() {
  const { isDark } = useTheme();
  const colors = useThemeColors();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(colors.bg);
      NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
    }
  }, [isDark, colors.bg]);

  const ThemedStatusBar = () => (
    <StatusBar
      style={isDark ? "light" : "dark"}
      backgroundColor="transparent"
      translucent={true}
    />
  );

  const screenOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: colors.bg,
    },
  };

  return {
    ThemedStatusBar,
    screenOptions,
    colors,
    isDark,
  };
}
