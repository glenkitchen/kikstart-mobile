import AnimatedView from "@/components/AnimatedView";
import Avatar from "@/components/Avatar";
import Header from "@/components/Header";
import ListLink from "@/components/ListLink";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <AnimatedView
      className="flex-1 bg-light-primary dark:bg-dark-primary"
      animation="fadeIn"
      duration={350}
      playOnlyOnce={false}
    >
      <Header showBackButton />
      <ThemedScroller>
        <View className=" w-full pb-10 pt-10">
          <View className="mb-4 flex-row items-center">
            <View className="ml-4 flex-1">
              <ThemedText className="text-2xl font-bold">John Doe</ThemedText>
              <View className="flex flex-row items-center">
                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                  johndoe@gmail.com
                </ThemedText>
              </View>
            </View>
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/5.jpg"
              size="lg"
            />
          </View>
        </View>

        <View className="px-4">
          <ListLink
            title="Address Book"
            description="Add, edit, delete addresses"
            icon="MapPin"
            href="/(screens)/profile/address-book"
          />
          <ListLink
            title="Payments"
            description="Manage payment methods"
            icon="CreditCard"
            href="/(screens)/profile/payments"
          />
          <ListLink
            title="Notifications"
            description="Push notifications, email notifications"
            icon="Bell"
            href="/(screens)/profile/notifications"
          />
          <ListLink
            title="Currency"
            description="USD - United states dollar"
            icon="DollarSign"
            href="/(screens)/profile/currency"
          />
          <ListLink
            title="Settings"
            description="Name, email, password"
            icon="Settings"
            href="/(screens)/settings"
          />
          <ListLink
            title="Help"
            description="Contact support"
            icon="HelpCircle"
            href="/(screens)/help"
          />
          <ListLink
            title="Logout"
            description="Logout from your account"
            icon="LogOut"
            href="/(screens)/logout"
          />
        </View>
      </ThemedScroller>
    </AnimatedView>
  );
}
