import ThemedText from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ProductScreen() {
  const { productId } = useLocalSearchParams();

  return (
    <View>
      <ThemedText>Product {productId}</ThemedText>
    </View>
  );
}
