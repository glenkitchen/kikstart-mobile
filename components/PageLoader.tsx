import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useThemeColors } from "../contexts/ThemeColors";
import ThemedText from "./ThemedText";

interface PageLoaderProps {
  text?: string;
}

export default function PageLoader({ text }: PageLoaderProps) {
  const colors = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center bg-light-primary dark:bg-dark-primary">
      <ActivityIndicator size="large" color={colors.highlight} />
      {text && (
        <ThemedText className="mt-4 text-light-subtext dark:text-dark-subtext">
          {text}
        </ThemedText>
      )}
    </View>
  );
}
