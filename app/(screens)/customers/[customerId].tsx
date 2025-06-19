import ThemedText from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function CustomerScreen() {
  const { customerId } = useLocalSearchParams();

  return (
    <View>
      <ThemedText>Customer {customerId}</ThemedText>
    </View>
  );
}
