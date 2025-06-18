import React from "react";
import { ActivityIndicator, View } from "react-native";
import useThemeColors from "../contexts/ThemeColors";
import ThemedText from "./ThemedText";

interface PageLoaderProps {
  text?: string;
}

export default function PageLoader({ text }: PageLoaderProps) {
  const colors = useThemeColors();

  return (
    <View className="bg-light-primary dark:bg-dark-primary flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.highlight} />
      {text && (
        <ThemedText className="text-light-subtext dark:text-dark-subtext mt-4">
          {text}
        </ThemedText>
      )}
    </View>
  );
}
