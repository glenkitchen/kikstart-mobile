import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColors } from "../contexts/ThemeColors";
import { Button } from "./Button";
import Favorite from "./Favorite";
import ThemedText from "./ThemedText";
const { width: windowWidth } = Dimensions.get("window");
interface CardProps {
  title: string;
  description?: string;
  image: string | ImageSourcePropType;
  href?: string;
  onPress?: () => void;
  variant?: "classic" | "overlay" | "compact" | "minimal";
  className?: string;
  button?: string;
  onButtonPress?: () => void;
  price?: string;
  rating?: number;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  iconColor?: string;
  imageHeight?: number;
  showOverlay?: boolean;
  hasFavorite?: boolean;
  overlayGradient?: readonly [string, string];
  width?: any;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  href,
  onPress,
  variant = "classic",
  className = "w-full",
  button,
  onButtonPress,
  price,
  rating,
  badge,
  hasFavorite = false,
  badgeColor = "#000000",
  imageHeight = 220,
  showOverlay = true,
  overlayGradient = ["transparent", "rgba(0,0,0,0.3)"] as readonly [
    string,
    string,
  ],
  rounded = "lg",
  width = "100%",
  children,
  style,
  ...props
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const getRoundedClass = () => {
    switch (rounded) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "2xl":
        return "rounded-2xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-lg";
    }
  };

  const renderBadge = () => {
    if (!badge) return null;
    return (
      <View
        className={`absolute right-2 top-2 z-10 rounded-full px-2 py-1 ${getRoundedClass()}`}
        style={{ backgroundColor: badgeColor }}
      >
        <Text className="text-xs font-medium text-white">{badge}</Text>
      </View>
    );
  };
  const colors = useThemeColors();
  const renderRating = () => {
    if (!rating) return null;
    return (
      <View className="flex-row items-center">
        <MaterialIcons name="star" size={16} color={colors.text} />
        <ThemedText className="ml-0 text-xs font-semibold">{rating}</ThemedText>
      </View>
    );
  };

  const renderPrice = () => {
    if (!price) return null;
    return (
      <ThemedText
        className={`text-sm font-bold  ${variant === "overlay" ? "text-white" : "text-dark-primary dark:text-white"}`}
      >
        {price}
      </ThemedText>
    );
  };

  const renderContent = () => {
    const cardContent = (
      <View
        className={`flex-1 overflow-hidden ${getRoundedClass()} ${className}`}
        style={style}
      >
        <View className="relative">
          {hasFavorite && (
            <View className="absolute right-2 top-2 z-50">
              <Favorite initialState={false} productName={title} size={24} />
            </View>
          )}
          {variant === "overlay" ? (
            <View style={{ height: imageHeight || 200 }}>
              <ImageBackground
                source={typeof image === "string" ? { uri: image } : image}
                className={`h-full w-full overflow-hidden ${getRoundedClass()}`}
              >
                {showOverlay && (
                  <LinearGradient
                    colors={overlayGradient}
                    className="relative flex h-full w-full flex-col justify-end"
                  >
                    <View className="absolute bottom-0 left-0 right-0 p-4">
                      <Text className="text-base font-bold text-white">
                        {title}
                      </Text>
                      {description && (
                        <Text numberOfLines={1} className="text-xs text-white">
                          {description}
                        </Text>
                      )}
                      {(price || rating) && (
                        <View className="mt-1 flex-row items-center justify-between">
                          {renderPrice()}
                          {renderRating()}
                        </View>
                      )}
                    </View>
                  </LinearGradient>
                )}
              </ImageBackground>
            </View>
          ) : (
            <Image
              source={typeof image === "string" ? { uri: image } : image}
              className={`w-full ${getRoundedClass()}`}
              style={{ height: imageHeight || 200 }}
            />
          )}
          {renderBadge()}
        </View>

        {variant !== "overlay" && (
          <View className="w-full flex-1 py-3 ">
            <ThemedText className="mb-0 text-sm font-semibold">
              {title}
            </ThemedText>

            {description && (
              <ThemedText
                numberOfLines={1}
                className="text-xs text-gray-600 dark:text-gray-300"
              >
                {description}
              </ThemedText>
            )}
            {(price || rating) && (
              <View className="mt-auto flex-row items-center justify-between">
                {renderPrice()}
                {renderRating()}
              </View>
            )}
            {children}
            {button && (
              <Button
                className="mt-3"
                title={button}
                size="small"
                onPress={onButtonPress}
              />
            )}
          </View>
        )}
      </View>
    );

    if (href) {
      return (
        <TouchableOpacity
          className={`${variant === "overlay" ? "!h-auto" : ""} ${className}`}
          activeOpacity={0.8}
          onPress={() => router.push(href as any)}
          style={{ width: width, ...style }}
        >
          {cardContent}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        className={`${variant === "overlay" ? "!h-auto" : ""} ${className}`}
        activeOpacity={0.8}
        onPress={handlePress}
        style={{ width: width, ...style }}
      >
        {cardContent}
      </TouchableOpacity>
    );
  };

  return renderContent();
};

export default Card;
