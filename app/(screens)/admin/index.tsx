import Header from "@/components/Header";
import ListLink from "@/components/ListLink";
import ThemedText from "@/components/ThemedText";
import { View } from "react-native";

import ThemedScroller from "@/components/ThemeScroller";
import React from "react";

export default function ProfileScreen() {
  return (
    <>
      <Header showBackButton />
      <ThemedScroller>
        <View className=" w-full pb-10 pt-10">
          <View className="mb-4 flex-row items-center">
            <View className="ml-4 flex-1">
              <ThemedText className="text-3xl font-bold">
                Manage your store
              </ThemedText>
              <View className="flex flex-row items-center">
                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                  Velora store admin
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        <View className="px-4">
          <ListLink
            title="Customers"
            description="List of customers"
            icon="Users"
            href="/(screens)/customers"
          />
          <ListLink
            title="Products"
            description="Add, edit, delete products"
            icon="Shirt"
            href="/(screens)/products"
          />
          <ListLink
            title="Orders"
            description="Manage orders"
            icon="Bookmark"
            href="/(screens)/admin/orders"
          />
          <ListLink
            title="Analytics"
            description="Revenue, orders, customers"
            icon="PieChart"
            href="/(screens)/admin/dashboard"
          />
          <ListLink
            title="Help"
            description="Contact support"
            icon="HelpCircle"
            href="/screens/help"
          />
        </View>
      </ThemedScroller>
    </>
  );
}
