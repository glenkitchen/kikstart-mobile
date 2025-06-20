import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import { useThemeColors } from "../contexts/ThemeColors";
import ThemedText from "./ThemedText";

interface ShowRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  displayMode?: "number" | "stars";
  className?: string;
  color?: string;
  style?: ViewStyle;
}

const ShowRating: React.FC<ShowRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  displayMode = "number",
  className = "",
  color,
  style,
}) => {
  const colors = useThemeColors();

  const starColor = color || colors.text;

  const getSize = () => {
    switch (size) {
      case "sm":
        return { icon: 12, text: "text-xs" };
      case "md":
        return { icon: 16, text: "text-sm" };
      case "lg":
        return { icon: 20, text: "text-base" };
      default:
        return { icon: 16, text: "text-sm" };
    }
  };

  if (displayMode === "number") {
    return (
      <View
        className={`flex-row items-center gap-1 ${className}`}
        style={style}
      >
        <ThemedText
          className={`font-medium ${getSize().text}`}
          style={color ? { color: starColor } : undefined}
        >
          {rating.toFixed(1)}
        </ThemedText>
        <Ionicons name="star" size={getSize().icon} color={starColor} />
      </View>
    );
  }

  return (
    <View className={`flex-row gap-0.5 ${className}`}>
      {[...Array(maxRating)].map((_, index) => (
        <Ionicons
          key={index}
          name={index < Math.round(rating) ? "star" : "star-outline"}
          size={getSize().icon}
          color={starColor}
        />
      ))}
    </View>
  );
};

export default ShowRating;
