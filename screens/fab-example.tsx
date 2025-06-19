import AnimatedFab from "@/components/AnimatedFab";
import { Button } from "@/components/Button";
import ThemedText from "@/components/ThemedText";
import { Stack } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useThemeColors } from "../contexts/ThemeColors";

export default function FabExampleScreen() {
  const colors = useThemeColors();

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Stack.Screen options={{ title: "Animated FAB Example" }} />

      <View className="flex-1 items-center justify-center p-5">
        <ThemedText className="mb-4 text-center text-2xl font-bold">
          Animated FAB Demo
        </ThemedText>
        <Text className="mb-6 text-center text-base text-light-subtext dark:text-dark-subtext">
          Tap the floating action button in the bottom right corner to see it
          transform.
        </Text>
      </View>

      {/* Basic usage example */}
      <AnimatedFab icon="Plus" position="bottomRight" iconSize={28}>
        <View className="w-full">
          <ThemedText className="mb-2 text-xl font-bold text-white">
            Super sale
          </ThemedText>
          <ThemedText className="mb-2 text-sm text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </ThemedText>
          <TextInput
            placeholderTextColor="white"
            placeholder="Enter your email"
            className="mb-4 mt-4 h-14 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-white"
          />
          <View className="mb-8 mt-4 flex-row items-center justify-between gap-2">
            <Button title="Cancel" variant="secondary" className="flex-1" />
            <Button title="Subscribe" className="flex-1" />
          </View>
        </View>
      </AnimatedFab>

      {/* Custom position and color example */}
      <AnimatedFab
        icon="Bell"
        position="topRight"
        backgroundColor="#FF6B6B"
        iconSize={18}
      >
        <Text className="mb-2 text-base font-bold text-white">
          Notifications
        </Text>
        <View className="flex-row items-center">
          <Text className="text-white">You have 3 new messages</Text>
        </View>
      </AnimatedFab>
    </View>
  );
}
