import Card from "@/components/Card";
import { CardScroller } from "@/components/CardScroller";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import ThemedScroller from "@/components/ThemeScroller";
import ThemedText from "@/components/ThemedText";
import { Section } from "@/components/layout/Section";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";

const MainSearchScreen = () => {
  const arrivals = [
    {
      id: 1,
      title: "Premium Cotton T-Shirt",
      description:
        "High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
      price: "$29.99",
      rating: 4.8,
      image: require("@/assets/img/male.jpg"),
    },
    {
      id: 2,
      title: "Classic Denim Jeans",
      description: "Classic fit denim jeans with premium quality fabric.",
      price: "$59.99",
      rating: 4.6,
      image: require("@/assets/img/female-2.jpg"),
    },
    {
      id: 3,
      title: "Leather Sneakers",
      description: "Stylish leather sneakers with cushioned sole.",
      price: "$89.99",
      rating: 4.9,
      image: require("@/assets/img/female-1.jpg"),
    },
    {
      id: 4,
      title: "Wool Sweater",
      description: "Warm and cozy wool sweater for cold days.",
      price: "$79.99",
      rating: 4.7,
      image: require("@/assets/img/male-2.jpg"),
    },
  ];

  return (
    <>
      <Header
        middleComponent={[
          <View
            key="search-input"
            className="flex-1 bg-light-primary dark:bg-dark-primary"
          >
            <Link href="/screens/search-form" asChild>
              <Pressable className="relative rounded-lg border border-black bg-light-primary px-10 py-3 dark:border-white dark:bg-dark-primary">
                <Icon
                  name="Search"
                  className="absolute left-3 top-3 z-50"
                  size={20}
                />
                <ThemedText className="text-black dark:text-white">
                  Search here
                </ThemedText>
              </Pressable>
            </Link>
          </View>,
        ]}
      />

      <ThemedScroller>
        <Category name="Clothing" image={require("@/assets/img/tops.png")} />
        <Category
          name="Footwear"
          image={require("@/assets/img/footwear.png")}
        />
        <Category name="Bottoms" image={require("@/assets/img/bottoms.png")} />
        <Category
          name="Accessories"
          image={require("@/assets/img/accessories.png")}
        />
        <Section title="New Arrivals" titleSize="lg" className=" my-8">
          <CardScroller space={10} className="mt-1">
            {arrivals.map((product) => (
              <Card
                imageHeight={220}
                width={150}
                key={product.id}
                rounded="lg"
                title={product.title}
                image={product.image}
                price={product.price}
                href={`/screens/product-detail?id=${product.id}`}
              />
            ))}
          </CardScroller>
        </Section>
      </ThemedScroller>
    </>
  );
};

const Category = (props: any) => (
  <Link href="/screens/products" asChild>
    <TouchableOpacity className="flex-row items-center border border-light-primary bg-stone-100 py-4 dark:border-dark-primary dark:bg-dark-secondary">
      {/*<Icon name={props.icon} size={24} strokeWidth={1.3} className='mr-2' />*/}
      <Image source={props.image} className="mx-4 h-20 w-20 bg-transparent" />
      <ThemedText className="mr-auto text-lg font-bold">
        {props.name}
      </ThemedText>
      <Icon
        name="ChevronRight"
        size={24}
        strokeWidth={1.3}
        className="ml-auto mr-4 opacity-50"
      />
    </TouchableOpacity>
  </Link>
);

export default MainSearchScreen;
