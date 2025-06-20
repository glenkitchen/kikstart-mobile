import { Chip } from "@/components/Chip";
import FloatingButton from "@/components/FloatingButton";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import ThemedText from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Sample product data using existing images
const productData = [
  {
    id: "1",
    title: "Premium Cotton T-Shirt",
    stock: 42,
    image: require("@/assets/img/male.jpg"),
    category: "clothing",
  },
  {
    id: "2",
    title: "Classic Denim Jeans",
    stock: 28,
    image: require("@/assets/img/female-2.jpg"),
    category: "clothing",
  },
  {
    id: "3",
    title: "Leather Sneakers",
    stock: 15,
    image: require("@/assets/img/female-1.jpg"),
    category: "footwear",
  },
  {
    id: "4",
    title: "Wool Sweater",
    stock: 7,
    image: require("@/assets/img/male-2.jpg"),
    category: "clothing",
  },
  {
    id: "5",
    title: "Running Shoes",
    stock: 22,
    image: require("@/assets/img/female-1.jpg"),
    category: "footwear",
  },
  {
    id: "6",
    title: "Designer Sunglasses",
    stock: 16,
    image: require("@/assets/img/male.jpg"),
    category: "accessories",
  },
  {
    id: "7",
    title: "Winter Coat",
    stock: 9,
    image: require("@/assets/img/female-2.jpg"),
    category: "clothing",
  },
  {
    id: "8",
    title: "Leather Wallet",
    stock: 31,
    image: require("@/assets/img/male-2.jpg"),
    category: "accessories",
  },
];

// Categories for filtering
const categories = [
  { id: "all", label: "All" },
  { id: "clothing", label: "Clothing" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
  { id: "low-stock", label: "Low Stock" },
];

export default function AdminProductsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Simple filtering logic
  const filteredProducts = productData.filter((product) => {
    // Filter by search query
    const matchesQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory ||
      (selectedCategory === "low-stock" && product.stock < 10);

    return matchesQuery && matchesCategory;
  });

  const handleProductPress = (productId: string) => {
    router.push(`/(screens)/products/${productId}`);
  };

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header
        title="Products"
        showBackButton
        rightComponents={[
          <TouchableOpacity
            key="add"
            className="ml-2"
            onPress={() => router.push("/(screens)/products/add")}
          >
            <Icon name="Plus" size={24} />
          </TouchableOpacity>,
        ]}
      />

      {/* Search bar */}
      <View className="px-global py-3">
        <View className="relative">
          <TextInput
            className="rounded-lg bg-light-secondary px-10 py-3 text-light-text dark:bg-dark-secondary dark:text-dark-text"
            placeholder="Search products..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="Search" size={20} className="absolute left-3 top-3.5" />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setSearchQuery("")}
            >
              <Icon name="X" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category filters */}
      <View className="px-global py-2">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Chip
              label={item.label}
              selectable
              isSelected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
              className="mr-2"
            />
          )}
          contentContainerStyle={{ paddingRight: 20 }}
        />
      </View>

      {/* Products list */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleProductPress(item.id)}
              className="flex-row items-center border-b border-light-secondary px-global py-3 dark:border-dark-secondary"
            >
              <Image
                source={item.image}
                className="h-20 w-16 rounded-md"
                resizeMode="cover"
              />
              <View className="ml-3 flex-1">
                <ThemedText className="font-semibold">{item.title}</ThemedText>
                <View className="mt-1 flex-row items-center">
                  <View
                    className={`h-2 w-2 rounded-full ${item.stock < 10 ? "bg-red-500" : "bg-green-500"} mr-2`}
                  />
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                    {item.stock} in stock
                  </ThemedText>
                </View>
              </View>
              <Icon name="ChevronRight" size={20} className="opacity-30" />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Icon
            name="Package"
            size={64}
            className="mb-4 text-light-secondary dark:text-dark-secondary"
          />
          <ThemedText className="mb-2 text-xl font-bold">
            No products found
          </ThemedText>
          <ThemedText className="text-center text-light-subtext dark:text-dark-subtext">
            Try changing your search or filter criteria
          </ThemedText>
        </View>
      )}
      <FloatingButton
        icon="Plus"
        label="Add Product"
        onPress={() => router.push("/(screens)/products/add")}
      />
    </View>
  );
}
