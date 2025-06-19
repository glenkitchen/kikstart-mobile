import ThemedText from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function DriverScreen() {
  const { driverId } = useLocalSearchParams();

  return (
    <View>
      <ThemedText>Driver {driverId}</ThemedText>
    </View>
  );
}
