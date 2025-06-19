import { Button } from "@/components/Button";
import Favorite from "@/components/Favorite";
import Header from "@/components/Header";
import { Section } from "@/components/layout/Section";
import { Placeholder } from "@/components/Placeholder";
import ThemedText from "@/components/ThemedText";
import ThemeScroller from "@/components/ThemeScroller";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";

const favoriteProducts = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: "$29.99",
    image: require("@/assets/img/female-1.jpg"),
  },
  {
    id: 2,
    title: "Running Shoes",
    price: "$89.99",
    image: require("@/assets/img/female.jpg"),
  },
  {
    id: 3,
    title: "Casual Jeans",
    price: "$49.99",
    image: require("@/assets/img/male-2.jpg"),
  },
  {
    id: 4,
    title: "Premium Cotton T-Shirt",
    price: "$29.99",
    image: require("@/assets/img/female-1.jpg"),
  },
  {
    id: 5,
    title: "Running Shoes",
    price: "$89.99",
    image: require("@/assets/img/female.jpg"),
  },
  {
    id: 6,
    title: "Casual Jeans",
    price: "$49.99",
    image: require("@/assets/img/male.jpg"),
  },
];

const FavoritesScreen = () => {
  return (
    <>
      <Header />
      <ThemeScroller>
        <Section
          titleSize="3xl"
          className="mt-16 pb-10"
          title="Favorites"
          subtitle="3 products in your favorites"
        />

        {favoriteProducts.length > 0 ? (
          <>
            {favoriteProducts.map((product) => (
              <View
                key={product.id}
                className="flex-row items-center rounded-xl border-b border-light-secondary py-global pr-global dark:border-dark-secondary"
              >
                <Link asChild href="/screens/product-detail">
                  <Pressable>
                    <Image
                      source={product.image}
                      className="h-28 w-20 rounded-lg"
                    />
                  </Pressable>
                </Link>
                <View className="ml-3 flex-1">
                  <ThemedText className="font-bold">{product.title}</ThemedText>
                  <ThemedText className="text-light-subtext dark:text-dark-subtext">
                    {product.price}
                  </ThemedText>
                  <Button
                    title="+ Add to cart"
                    variant="outline"
                    size="small"
                    className="mr-auto mt-2 px-2 py-1"
                  />
                </View>
                <View className="flex-row items-center">
                  <Favorite
                    initialState={true}
                    productName={product.title}
                    size={24}
                  />
                </View>
              </View>
            ))}
          </>
        ) : (
          <Placeholder
            title="No favorites"
            subtitle="Add some products to your favorites"
          />
        )}
      </ThemeScroller>
    </>
  );
};

export default FavoritesScreen;
