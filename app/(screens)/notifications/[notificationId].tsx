import ThemedText from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function NotificationScreen() {
  const { notificationId } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <ThemedText>Notification {notificationId}</ThemedText>
    </View>
  );
}
