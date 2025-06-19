import Header from "@/components/Header";
import Icon from "@/components/Icon";
import ThemedScroller from "@/components/ThemeScroller";
import ThemedText from "@/components/ThemedText";
import List from "@/components/layout/List";
import ListItem from "@/components/layout/ListItem";
import { Link, router } from "expo-router";
import React, { JSX, useEffect, useRef, useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { useThemeColors } from "../contexts/ThemeColors";
const SearchScreen = () => {
  const colors = useThemeColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(true); // Start focused
  const inputRef = useRef<TextInput>(null);

  const products = [
    {
      id: 1,
      name: "Blue t-shirt",
      price: "$29.99",
      image: require("@/assets/img/female-1.jpg"),
    },
    {
      id: 2,
      name: "Orange t-shirt",
      price: "$19.99",
      image: require("@/assets/img/female.jpg"),
    },
    {
      id: 3,
      name: "Red t-shirt",
      price: "$29.99",
      image: require("@/assets/img/male-2.jpg"),
    },
    {
      id: 4,
      name: "Blue t-shirt",
      price: "$29.99",
      image: require("@/assets/img/female-1.jpg"),
    },
    {
      id: 5,
      name: "Orange t-shirt",
      price: "$19.99",
      image: require("@/assets/img/female.jpg"),
    },
    {
      id: 6,
      name: "Red t-shirt",
      price: "$29.99",
      image: require("@/assets/img/male-2.jpg"),
    },
  ];

  // Auto-focus input when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // Small delay to ensure UI is ready
  }, []);

  // Filter function to apply search query to the data
  const filterData = (data: any[]) => {
    if (!searchQuery) return data; // Return all items if no search query
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <>
      <Header
        middleComponent={
          <View className="flex-1 bg-light-primary dark:bg-dark-primary">
            <View className="relative rounded-lg border border-black bg-light-primary dark:border-white dark:bg-dark-primary">
              <Icon
                name="ArrowLeft"
                onPress={() => router.back()}
                className="absolute left-1.5 top-1.5 z-50"
                size={20}
              />

              <TextInput
                //ref={inputRef}
                className="rounded-lg py-3 pl-10 pr-3 text-black dark:text-white"
                placeholder="Search here"
                placeholderTextColor={colors.placeholder}
                //onChangeText={setSearchQuery}
                //value={searchQuery}
                returnKeyType="done"
                //onFocus={() => setIsInputFocused(true)}
                //onBlur={() => setIsInputFocused(searchQuery.length > 0)} // Only unfocus if there's no query
                autoFocus={false}
              />

              {/* Render the 'x' icon only when the search query is not empty */}
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => {
                    setSearchQuery("");
                    // Keep focused state if input is still focused
                    setIsInputFocused(true);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-3 z-50 opacity-50"
                >
                  <Icon name="X" size={20} />
                </Pressable>
              )}
            </View>
          </View>
        }
      />

      <ThemedScroller className="flex-1" keyboardShouldPersistTaps="handled">
        <SearchSection
          title={searchQuery ? "Search Results" : "All Products"}
          data={filterData(products)}
          renderItem={Product}
        />
      </ThemedScroller>
    </>
  );
};

interface SearchSectionProps {
  title: string;
  data: any[];
  renderItem: (item: any) => JSX.Element;
}

const SearchSection = ({ title, data, renderItem }: SearchSectionProps) => (
  <>
    {data.length > 0 ? (
      <View className="mb-8">
        <ThemedText className="mb-4 text-lg font-bold">
          {data.length} {title}
        </ThemedText>
        <List spacing={25} variant="separated">
          {data.map((item) => (
            <View key={item.id}>{renderItem(item)}</View>
          ))}
        </List>
      </View>
    ) : (
      <View className="flex-1 items-center justify-center p-10">
        <ThemedText className="mb-2 text-center text-lg font-bold">
          No products found
        </ThemedText>
        <ThemedText className="text-center text-light-subtext dark:text-dark-subtext">
          Try adjusting your search terms.
        </ThemedText>
      </View>
    )}
  </>
);

interface ProductProps {
  id: number;
  image: any;
  name: string;
  price: string;
}

const Product = ({ id, image, name, price }: ProductProps) => (
  <Link href={`/screens/product-detail?id=${id}`} asChild>
    <ListItem
      leading={
        <Image
          source={image}
          className="h-16 w-12 rounded-md bg-light-secondary dark:bg-dark-secondary"
        />
      }
      title={name}
      subtitle={price}
      trailing={<Icon name="ChevronRight" size={15} className="opacity-50" />}
      onPress={() => {}}
    />
  </Link>
);
export default SearchScreen;
