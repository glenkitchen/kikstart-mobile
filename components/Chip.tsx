import { Link } from "expo-router";
import React, { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon, { IconName } from "./Icon";

type ChipSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface ChipProps {
  label: string;
  isSelected?: boolean;
  className?: string;
  style?: ViewStyle;
  size?: ChipSize;
  href?: string;
  onPress?: () => void;
  icon?: IconName; // Correct icon type
  iconSize?: number;
  iconColor?: string;
  image?: ImageSourcePropType;
  imageSize?: number;
  leftContent?: ReactNode; // For custom left content
  selectable?: boolean; // New property for selectable chips
}

export const Chip = ({
  label,
  isSelected,
  className,
  style,
  size = "md",
  href,
  onPress,
  icon,
  iconSize,
  iconColor,
  image,
  imageSize,
  leftContent,
  selectable,
}: ChipProps) => {
  // Size mappings
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
    xl: "px-5 py-2 text-lg",
    xxl: "px-6 py-2.5 text-xl",
  };

  // Default icon/image sizes based on chip size
  const getDefaultIconSize = () => {
    const sizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 };
    return iconSize || sizes[size];
  };

  const getDefaultImageSize = () => {
    const sizes = { xs: 16, sm: 18, md: 20, lg: 24, xl: 28, xxl: 32 };
    return imageSize || sizes[size];
  };

  // Handle selectable chips - if selectable is true and no onPress is provided, create a toggle handler
  const [selected, setSelected] = React.useState(isSelected || false);

  const handlePress = () => {
    if (selectable) {
      setSelected(!selected);
    }
    onPress && onPress();
  };

  // Use either the controlled isSelected prop or internal selected state
  const isChipSelected = selectable ? selected : isSelected;

  // Render left content (icon, image, or custom content)
  const renderLeftContent = () => {
    if (leftContent) {
      return leftContent;
    }

    if (icon) {
      return (
        <Icon
          name={icon}
          size={getDefaultIconSize()}
          color={iconColor || (isChipSelected ? "white" : "gray")}
          className="-ml-1 mr-2"
        />
      );
    }

    if (image) {
      return (
        <Image
          className="-ml-2 mr-2 rounded-lg"
          source={image}
          style={{
            width: getDefaultImageSize(),
            height: getDefaultImageSize(),
          }}
        />
      );
    }

    return null;
  };

  // Extract size-specific classes
  const [paddingClasses, textSizeClass] = sizeClasses[size].split(" text-");

  // The chip content
  const chipContent = (
    <>
      <View className="flex-row items-center">
        {renderLeftContent()}
        <Text
          className={`text-${textSizeClass} ${isChipSelected ? "text-white dark:text-black" : "text-gray-700 dark:text-white/50"}`}
        >
          {label}
        </Text>
      </View>
    </>
  );

  // Wrapper with appropriate styling
  const chipWrapper = (children: ReactNode) => (
    <View className={`${className || ""}`} style={style}>
      <View
        className={`${paddingClasses} rounded-full ${isChipSelected ? "bg-black dark:bg-white" : "bg-light-secondary dark:bg-dark-secondary"} flex-row items-center justify-center`}
      >
        {children}
      </View>
    </View>
  );

  // Return either a Link or TouchableOpacity based on props
  if (href) {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          {chipWrapper(chipContent)}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={!onPress && !selectable}
    >
      {chipWrapper(chipContent)}
    </TouchableOpacity>
  );
};
