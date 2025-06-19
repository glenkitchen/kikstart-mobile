import ThemedText from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function SupplierScreen() {
  const { supplierId } = useLocalSearchParams();

  return (
    <View>
      <ThemedText>Supplier {supplierId}</ThemedText>
    </View>
  );
}
