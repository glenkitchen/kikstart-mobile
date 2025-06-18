import { Button } from "@/components/Button";
import Input from "@/components/forms/Input";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import ThemedFooter from "@/components/ThemeFooter";
import ThemedScroller from "@/components/ThemeScroller";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import useThemeColors from "../contexts/ThemeColors";

interface ReviewScreenProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const colors = useThemeColors();

  const handlePress = (starIndex: number) => {
    const newRating = starIndex + 1;
    setRating(newRating === rating ? 0 : newRating);
  };

  return (
    <View className="my-6 flex-row justify-center">
      {[0, 1, 2, 3, 4].map((starIndex) => (
        <TouchableOpacity
          key={starIndex}
          onPress={() => handlePress(starIndex)}
          className="h-10 w-10 items-center justify-center"
        >
          <FontAwesome
            name={rating > starIndex ? "star" : "star-o"}
            size={30}
            color={rating > starIndex ? colors.icon : colors.text}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ReviewScreen = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const colors = useThemeColors();

  // Mock product data (replace with actual data)
  const product = {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: require("@/assets/img/male-2.jpg"),
  };

  const handleSubmit = () => {
    // Implement review submission logic
    console.log({ rating, review });
    router.back();
  };

  return (
    <>
      <Header title="Write a Review" showBackButton />
      <ThemedScroller
        className="flex-1 pt-8"
        keyboardShouldPersistTaps="handled"
      >
        {/* Product Information */}
        <View className="mb-0 flex-col items-center">
          <Image
            source={product.image}
            className="bg-light-secondary dark:bg-dark-secondary h-20 w-14 rounded-lg"
          />
          <View className="flex-1 items-center justify-center">
            <ThemedText className="mt-global text-base font-bold">
              {product.name}
            </ThemedText>
            <ThemedText className="text-light-subtext dark:text-dark-subtext">
              ${product.price.toFixed(2)}
            </ThemedText>
          </View>
        </View>

        {/* Star Rating */}
        <StarRating rating={rating} setRating={setRating} />

        {/* Review Input */}
        <Input
          label="Write your review"
          isMultiline
          style={{
            textAlignVertical: "top",
            height: 120,
          }}
          value={review}
          onChangeText={setReview}
        />
      </ThemedScroller>
      <ThemedFooter>
        <Button
          title="Submit Review"
          onPress={handleSubmit}
          disabled={rating === 0 || !review.trim()}
        />
      </ThemedFooter>
    </>
  );
};

export default ReviewScreen;
