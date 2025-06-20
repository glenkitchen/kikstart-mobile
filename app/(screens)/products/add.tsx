import { Button } from "@/components/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Icon from "@/components/Icon";
import { MultipleImagePicker } from "@/components/MultipleImagePicker";
import MultiStep, { Step } from "@/components/MultiStep";
import ProductVariantCreator from "@/components/ProductVariantCreator";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import { useThemeColors } from "@/contexts/ThemeColors";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, Pressable, Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddServiceFlow = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Define state for form data
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const handleDeleteProduct = () => {
    Alert.alert(
      "Delete product?",
      "Are you sure you want to delete the product?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => navigation.goBack() },
      ],
    );
  };

  const handleClose = () => {
    Alert.alert(
      "Exit Session",
      "Are you sure you want to go back? Your progress will not be saved.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => navigation.goBack() },
      ],
    );
    return true; // Prevent default back behavior
  };

  const handleComplete = () => {
    console.log("Product Added Successfully");
    navigation.goBack();
  };

  const handleStepChange = (nextStep: number) => {
    setCurrentStepIndex(nextStep);
    return true;
  };

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (currentStepIndex > 0) {
          setCurrentStepIndex((prev) => prev - 1);
          return true; // Prevent default back behavior
        } else {
          handleClose();
          return true;
        }
      },
    );
    return () => backHandler.remove();
  }, [currentStepIndex]);

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <View className="absolute left-4 top-4 z-10">
        <Pressable
          onPress={handleDeleteProduct}
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <Icon name="Trash2" size={25} />
        </Pressable>
      </View>

      <MultiStep
        onComplete={handleComplete}
        onClose={() => navigation.goBack()}
        showHeader={true}
        showStepIndicator={true}
        onStepChange={handleStepChange}
      >
        <Step title="Category">
          <View className="px-4 pt-6">
            <Text className="mb-6 text-2xl font-medium dark:text-white">
              Choose product category
            </Text>
            <PickerBox
              title="Clothing"
              description="T-shirts, hoodies, jackets, pants"
            />
            <PickerBox
              title="Footwear "
              description="Sneakers, boots, sandals"
            />
            <PickerBox
              title="Accessories"
              description="Hats, bags, sunglasses, wallets, belts, jewelry"
            />
            <PickerBox
              title="Other"
              description="Different product category "
            />
          </View>
        </Step>

        <Step title="Basic Information">
          <View className="px-4 pt-6">
            <ThemedText className="text-2xl font-medium">
              Basic information
            </ThemedText>
            <ThemedText className="mb-4 text-sm text-light-subtext dark:text-dark-subtext">
              Describe your product in few words and add photos
            </ThemedText>
            <MultipleImagePicker />
            <View className="mt-6">
              <Input
                rightIcon="Tag"
                label="Product name"
                value={productName}
                onChangeText={setProductName}
              />
              <Select
                label="Category"
                options={[
                  { label: "Men", value: "Men" },
                  { label: "Women", value: "Women" },
                  { label: "Kids", value: "Kids" },
                ]}
                onChange={() => {}}
              />
              <Input
                isMultiline
                label="Description"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
        </Step>

        <Step title="Pricing">
          <ThemedScroller className="px-4 pt-6">
            <ThemedText className="text-2xl font-medium">Pricing</ThemedText>
            <ThemedText className="mb-4 text-sm text-light-subtext dark:text-dark-subtext">
              Set a base price of the product
            </ThemedText>
            <Input
              keyboardType="numeric"
              label="Base price"
              value={basePrice}
              onChangeText={setBasePrice}
            />
            <View className="mt-8 flex-row items-center">
              <View className="mr-auto">
                <ThemedText className=" text-xl font-medium">
                  Options
                </ThemedText>
                <ThemedText className="mb-4 text-sm text-light-subtext  dark:text-dark-subtext">
                  Sizes, colors, duration
                </ThemedText>
              </View>
              <Suggestion isOptions />
            </View>
            <ProductVariantCreator hasStock />
            <View className="h-20 w-full" />
          </ThemedScroller>
        </Step>
      </MultiStep>
      <View style={{ paddingBottom: insets.bottom }}>
        <Button variant="ghost" title="Delete product" iconStart="Trash2" />
      </View>
    </View>
  );
};

interface PickerBoxProps {
  title: string;
  description: string;
}

const PickerBox: React.FC<PickerBoxProps> = ({ title, description }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPress={() => setIsPressed(!isPressed)}
      className={`relative w-full flex-row items-center justify-between rounded-lg  border p-4 ${isPressed ? " mb-[8px] border-2 border-black dark:border-white" : "mb-[10px] border-black/40 dark:border-white/40"}`} // Change the icon name based on the state
    >
      <View>
        <ThemedText className={`line-clamp-1 text-base font-medium`}>
          {title}
        </ThemedText>
        <ThemedText className={`text-sm `}>{description}</ThemedText>
      </View>
    </Pressable>
  );
};

interface SuggestionProps {
  isOptions?: boolean;
}

export const Suggestion: React.FC<SuggestionProps> = ({ isOptions }) => {
  const colors = useThemeColors();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handlePresentModal = () => {
    actionSheetRef.current?.show();
  };

  return (
    <>
      <Pressable
        onPress={handlePresentModal}
        className="flex h-[40px] w-[40px] flex-row items-center justify-center rounded-full bg-light-secondary dark:bg-dark-secondary"
      >
        <Icon name="Search" size={20} />
      </Pressable>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: colors.bg,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="p-4">
          <ThemedText className="mx-auto mb-4 text-sm font-bold">
            Suggestions
          </ThemedText>
          <View className="w-full">
            {isOptions ? (
              <>
                <SuggestionItem
                  hasCheckbox
                  title="Sizes"
                  description="Small, Medium, Large, Extra Large"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Colors"
                  description="Black, White, Blue"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Duration"
                  description="1 hour, 2 hours, 1 day, 1 week"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Number of people"
                  description="1, 2, 3, 4, 5"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Type of shooting"
                  description="From water, From beach, Drone"
                />
              </>
            ) : (
              <>
                <SuggestionItem
                  title="Beginner Surf Lessons"
                  description="Introduction to surfing basics, including ocean safety, paddling techniques, and standing up on the board."
                />
                <SuggestionItem
                  title="Intermediate Surf Lessons"
                  description="Advanced techniques for more experienced surfers, such as turning, wave selection, and improving overall surfing skills."
                />
                <SuggestionItem
                  title="Group Surf Lessons"
                  description="Lessons for small groups, often friends or family, providing a more social learning experience."
                />
                <SuggestionItem
                  title="Kids' Surf Lessons"
                  description="Specialized instruction for children, focusing on safety, fun, and building confidence in the water."
                />
                <SuggestionItem
                  title="Video Analysis"
                  description="Using video recordings of the student's surfing sessions to analyze and provide detailed feedback on technique and areas for improvement."
                />
                <SuggestionItem
                  title="Drone Footage"
                  description="Aerial shots and videos of surfers and surf spots, providing a unique perspective that captures the scale and beauty of the surf environment."
                />
                <SuggestionItem
                  title="Session Photo Packages"
                  description="Offering packages that include a set number of photos or a video of a surfer's session, often tailored to individual surfers or groups."
                />
                <SuggestionItem
                  title="Surf Trip Documentation"
                  description="Providing comprehensive photo and video coverage of surf trips, including travel, lifestyle, and surfing action, to create memorable keepsakes."
                />
              </>
            )}
          </View>
        </View>
      </ActionSheet>
    </>
  );
};

interface SuggestionItemProps {
  title: string;
  description: string;
  hasCheckbox?: boolean;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  title,
  description,
  hasCheckbox,
}) => {
  return (
    <Pressable
      onPress={() => {}}
      className="flex flex-row items-center border-b border-light-secondary py-5 dark:border-dark-secondary"
    >
      <View className="flex-1 pr-4">
        <ThemedText className="text-base font-semibold">{title}</ThemedText>
        <ThemedText
          numberOfLines={1}
          className="text-xs text-light-subtext dark:text-dark-subtext"
        >
          {description}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default AddServiceFlow;
