import { Button } from "@/components/Button";
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import ThemedText from "@/components/ThemedText";
import Switch from "@/components/forms/Switch";
import { Section } from "@/components/layout/Section";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    orderUpdates: true,
    promotions: true,
    newArrivals: true,
    backInStock: true,
    priceDrops: true,
    deliveryUpdates: false,
    marketingEmails: false,
  });

  const handleToggle = (
    setting: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const saveSettings = () => {
    navigation.goBack();
  };

  return (
    <View className="bg-light-bg dark:bg-dark-bg flex-1">
      <Header
        showBackButton
        rightComponents={[
          <Button key="save" title="Save changes" onPress={saveSettings} />,
        ]}
      />
      <ThemedScroller>
        <Section
          titleSize="3xl"
          className="mt-10 pb-10"
          title="Notifications"
          subtitle="Manage how you receive notifications and updates"
        />

        <View className="mb-8">
          <ThemedText className="mb-4 text-lg font-bold">
            Push Notifications
          </ThemedText>

          <Switch
            label="Order Updates"
            description="Get notified about your order status"
            value={notifications.orderUpdates}
            onChange={(value) => handleToggle("orderUpdates", value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />

          <Switch
            label="Promotions"
            description="Sales, discounts and special offers"
            value={notifications.promotions}
            onChange={(value) => handleToggle("promotions", value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />

          <Switch
            label="New Arrivals"
            description="Be the first to know about new products"
            value={notifications.newArrivals}
            onChange={(value) => handleToggle("newArrivals", value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />

          <Switch
            label="Back in Stock"
            description="When items you're interested in are available"
            value={notifications.backInStock}
            onChange={(value) => handleToggle("backInStock", value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />

          <Switch
            label="Price Drops"
            description="Get notified when items in your wishlist drop in price"
            value={notifications.priceDrops}
            onChange={(value) => handleToggle("priceDrops", value)}
            disabled={!notifications.pushEnabled}
            className="mb-2"
          />
        </View>

        <View className="mt-8">
          <ThemedText className="mb-4 text-lg font-bold">
            Email Notifications
          </ThemedText>

          <Switch
            label="Delivery Updates"
            description="Tracking information and delivery confirmations"
            value={notifications.deliveryUpdates}
            onChange={(value) => handleToggle("deliveryUpdates", value)}
            className="mb-4"
          />

          <Switch
            label="Marketing Emails"
            description="Newsletters, promotions and product recommendations"
            value={notifications.marketingEmails}
            onChange={(value) => handleToggle("marketingEmails", value)}
            className="mb-2"
          />
        </View>
      </ThemedScroller>
    </View>
  );
};

export default NotificationsScreen;
