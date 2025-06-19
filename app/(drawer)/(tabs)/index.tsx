import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import { CardScroller } from "@/components/CardScroller";
import { Chip } from "@/components/Chip";
import CustomCard from "@/components/CustomCard";
import Header, { HeaderIcon } from "@/components/Header";
import Icon from "@/components/Icon";
import ThemeScroller from "@/components/ThemeScroller";
import ThemedText from "@/components/ThemedText";
import Grid from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

const products = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    description:
      "High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
    price: "$29.99",
    rating: 4.8,
    image: require("@/assets/img/male.jpg"),
    badge: "New",
  },
  {
    id: 2,
    title: "Classic Denim Jeans",
    description: "Classic fit denim jeans with premium quality fabric.",
    price: "$59.99",
    rating: 4.6,
    image: require("@/assets/img/female-2.jpg"),
    badge: "Sale",
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

export default function HomeScreen() {
  const rightComponents = [
    //<HeaderIcon hasBadge icon="MessageCircle" href="/screens/chat/list" />,
    <HeaderIcon
      hasBadge
      icon="Bell"
      href="/(screens)/notifications"
      key="bell"
    />,
    <Avatar
      link="/(screens)/profile"
      size="xxs"
      className="mb-1 ml-1"
      src={require("@/assets/img/thomino.jpg")}
      key="avatar"
    />,
  ];

  return (
    <>
      <Header
        variant="blurred"
        leftComponent={
          <ThemedText className="font-outfit-bold text-2xl">
            Velora<Text className="text-teal-300">.</Text>{" "}
          </ThemedText>
        }
        rightComponents={rightComponents}
        //variant='transparent'
      />

      <ThemeScroller
        scrollEventThrottle={16}
        className="p-0"
        style={{ paddingTop: 100 }}
      >
        <View className="flex-1">
          <CustomCard
            backgroundImage={require("@/assets/img/banner-2.jpg")}
            className="w-full"
            rounded="none"
            overlayOpacity={0}
            href="/screens/products"
          >
            <View className="flex h-[350px] w-full flex-col justify-end p-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-2xl font-bold text-white">
                    Summer 2025
                  </Text>
                  <Text className="mb-3 text-xs text-white">
                    New collection just arrived
                  </Text>
                </View>
              </View>
              <View className="mr-auto mt-2 flex-row items-center justify-start rounded-full bg-white px-4 py-1">
                <Text className="text-sm text-black">View all</Text>
              </View>
            </View>
          </CustomCard>

          <CardScroller space={0} className="mt-0">
            <FeaturedProduct
              title="Night dress"
              price="$29.99"
              image={require("@/assets/img/female-1.jpg")}
            />
            <FeaturedProduct
              title="Summer jacket"
              price="$29.99"
              image={require("@/assets/img/female-2.jpg")}
            />
            <FeaturedProduct
              title="Casual jacket"
              price="$29.99"
              image={require("@/assets/img/male-2.jpg")}
            />
          </CardScroller>

          <CardScroller className="mt-3 px-global" space={6}>
            <Chip
              onPress={() => router.push("/screens/products")}
              label="Women"
            />
            <Chip
              onPress={() => router.push("/screens/products")}
              label="Men"
            />
            <Chip
              onPress={() => router.push("/screens/products")}
              label="Kids"
            />
            <Chip
              onPress={() => router.push("/screens/products")}
              label="Accessories"
            />
            <Chip
              onPress={() => router.push("/screens/products")}
              label="Jewelry"
            />
            <Chip
              onPress={() => router.push("/screens/products")}
              label="Sale"
            />
          </CardScroller>

          <Section
            //title="All Products"
            className="mt-4 px-2"
            titleSize="lg"
            //padding="md"
          >
            <Grid className="mt-2" columns={2} spacing={5}>
              {products.map((product) => (
                <Card
                  imageHeight={250}
                  key={product.id}
                  rounded="none"
                  title={product.title}
                  //description={product.description}
                  image={product.image}
                  price={product.price}
                  //rating={product.rating}
                  badge={product.badge}
                  //badgeColor={product.badgeColor}
                  href={`/screens/product-detail?id=${product.id}`}
                  //variant='overlay'
                />
              ))}
            </Grid>
          </Section>
        </View>
        <View className="h-[50px]" />
      </ThemeScroller>
    </>
  );
}

const CategorySelect = (props: any) => {
  return (
    <Pressable className="flex flex-col items-center justify-center">
      <View className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
        <Icon name={props.icon} strokeWidth={1.4} size={24} />
      </View>
      <ThemedText className="text-xs">{props.title}</ThemedText>
    </Pressable>
  );
};

const FeaturedProduct = (props: any) => {
  return (
    <Link href="/screens/product-detail" asChild>
      <Pressable className="h-[400px] w-[300px]">
        <ImageBackground source={props.image} className="h-full w-full">
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)"]}
            className="h-full w-full"
          >
            <View className="flex-1 items-start justify-end p-4">
              <Text className="text-base font-bold text-white">
                {props.title}
              </Text>
              <Text className="mb-3 text-xs text-white">{props.price}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};
