import ThemeToggle from "@/components/ThemeToggle";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "./Avatar";
import Icon, { IconName } from "./Icon";
import ThemedText from "./ThemedText";
import ThemedScroller from "./ThemeScroller";

export default function CustomDrawerContent() {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      style={{
        borderTopLeftRadius: Platform.OS === "ios" ? 70 : 0,
        borderBottomLeftRadius: Platform.OS === "ios" ? 70 : 0,
      }}
      intensity={30}
      tint="systemUltraThinMaterialLight"
      className={`flex-1 overflow-hidden bg-white/70 dark:bg-black/90 ${Platform.OS === "ios" ? "bg-white/70 dark:bg-black/90" : "bg-white dark:bg-black"}`}
    >
      <ThemedScroller
        style={{ paddingTop: insets.top + 30 }}
        className="bg-transparent px-10 py-6  "
      >
        <View className="flex-col ">
          <View className="w-full flex-row items-center justify-between">
            <Avatar
              link="/(drawer)/(tabs)/profile"
              size="md"
              className="mb-2"
              border
              src={require("@/assets/img/thomino.jpg")}
            />
            <ThemeToggle />
          </View>
          <View className="ml-0">
            <ThemedText className="text-lg font-bold">John Dogerthy</ThemedText>
            <ThemedText className="mb-4 text-sm text-light-subtext dark:text-dark-subtext">
              johndoe0294
            </ThemedText>
          </View>
        </View>

        <View className="my-6 flex-col py-6">
          <NavItem href="/(screens)/profile" icon="User" label="Profile" />
          <NavItem href="/(screens)/admin" icon="Contact" label="Admin" />
          <NavItem href="/(screens)/orders" icon="Package" label="Orders" />
          <NavItem
            href="/(screens)/onboarding-start"
            icon="Lightbulb"
            label="Onboarding"
          />
          <NavItem href="/(screens)/welcome" icon="Package" label="Welcome" />
          <NavItem
            href="/(screens)/notification-permission"
            icon="ShieldCheck"
            label="Permissions"
          />
          <NavItem href="/(screens)/login" icon="ArrowLeft" label="Sign out" />
        </View>

        <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
          Version 0.0.12
        </ThemedText>
      </ThemedScroller>
    </BlurView>
  );
}

type NavItemProps = {
  href: string;
  icon: IconName;
  label: string;
  className?: string;
};

export const NavItem = ({ href, icon, label }: NavItemProps) => (
  <TouchableOpacity
    onPress={() => router.push(href as any)}
    className={`flex-row items-center py-4`}
  >
    <Icon name={icon} size={24} className="" />
    {label && (
      <ThemedText className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        {label}
      </ThemedText>
    )}
  </TouchableOpacity>
);
