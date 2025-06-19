import { Stack } from "expo-router";

export default function DriversLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[driverId]" />
    </Stack>
  );
}
