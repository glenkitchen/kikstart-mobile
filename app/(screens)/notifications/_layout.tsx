import { Stack } from "expo-router";

export default function NotificationsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[notificationId]" />
    </Stack>
  );
}
