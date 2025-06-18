import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import FormTabs, { FormTab } from "@/components/forms/FormTabs";
import Input from "@/components/forms/Input";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Divider from "@/components/layout/Divider";
import { Section } from "@/components/layout/Section";
import ThemedScroller from "@/components/ThemeScroller";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Header
        showBackButton
        rightComponents={[<Button title="Save changes" />]}
      />
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ThemedScroller>
          <Section
            titleSize="3xl"
            className="pb-10 pt-4"
            title="Profile Settings"
            subtitle="Manage your account settings"
          />

          <Input
            label="First Name"
            value="John"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Last Name"
            value="Doe"
            containerClassName="flex-1"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Email"
            keyboardType="email-address"
            value="john.doe@example.com"
            autoCapitalize="none"
          />

          <Divider className="my-4" />

          <FormTabs>
            <FormTab title="Male" />
            <FormTab title="Female" />
            <FormTab title="Other" />
          </FormTabs>
          <Divider className="my-4" />

          <Section
            titleSize="xl"
            className="pb-4 pt-4"
            title="Saved sizes"
            subtitle="To show best results, we recommend saving your sizes"
          />
          <View className="flex-row gap-2">
            <Chip label="XS" />
            <Chip label="S" />
            <Chip label="M" />
            <Chip label="L" />
            <Chip label="XL" />
            <Chip label="XXL" />
          </View>
          <Divider className="my-10" />
          <Section
            titleSize="xl"
            className="pb-4"
            title="Profile picture"
            subtitle="Upload or change your profile picture"
          />

          <View className="mb-8 mt-6 flex-row items-center">
            <TouchableOpacity
              onPress={pickImage}
              className="relative"
              activeOpacity={0.9}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="border-light-primary dark:border-dark-primary h-28 w-28 rounded-full border"
                />
              ) : (
                <View className="bg-light-secondary dark:bg-dark-secondary h-24 w-24 items-center justify-center rounded-full">
                  <Icon
                    name="Plus"
                    size={25}
                    className="text-light-subtext dark:text-dark-subtext"
                  />
                </View>
              )}
            </TouchableOpacity>
            <View className="ml-4">
              <Button
                title={profileImage ? "Change photo" : "Upload photo"}
                className="text-light-subtext dark:text-dark-subtext text-sm"
                onPress={pickImage}
              />

              {profileImage && (
                <Button
                  className="mt-2"
                  title="Remove photo"
                  variant="ghost"
                  onPress={() => setProfileImage(null)}
                />
              )}
            </View>
          </View>
        </ThemedScroller>
      </KeyboardAvoidingView>
    </>
  );
}
