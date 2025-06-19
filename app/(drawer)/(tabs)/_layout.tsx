import DrawerButton from "@/components/DrawerButton";
import { TabButton } from "@/components/TabButton";
import { useThemeColors } from "@/contexts/ThemeColors";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{
          backgroundColor: colors.bg,
          borderTopColor: colors.secondary,
          borderTopWidth: 1,
          paddingBottom: insets.bottom,
        }}
      >
        <TabTrigger name="home" href="/" asChild>
          <TabButton labelAnimated={true} icon="Home">
            Home
          </TabButton>
        </TabTrigger>
        <TabTrigger name="favorites" href="/favorites" asChild>
          <TabButton labelAnimated={true} icon="Heart">
            Favorites
          </TabButton>
        </TabTrigger>
        <TabTrigger name="search" href="/(tabs)/search" asChild>
          <TabButton labelAnimated={true} icon="Search">
            Search
          </TabButton>
        </TabTrigger>
        <TabTrigger name="cart" href="/cart" asChild>
          <TabButton hasBadge labelAnimated={true} icon="ShoppingCart">
            Cart
          </TabButton>
        </TabTrigger>

        <View className="flex w-1/5 items-center justify-center opacity-40   ">
          <DrawerButton className="w-full" />
        </View>

        {/****Items that are on this level but hidden from tabBar
          <TabTrigger name="profile" href="/(drawer)/(tabs)/profile" asChild style={{ display: 'none' }}>
            <TabButton icon="user">Profile</TabButton>
          </TabTrigger>*/}
      </TabList>
    </Tabs>
  );
}
