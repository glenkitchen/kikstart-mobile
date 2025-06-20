import ActionSheetThemed from "@/components/ActionSheetThemed";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/Button";
import { CardScroller } from "@/components/CardScroller";
import CustomCard from "@/components/CustomCard";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { List } from "@/components/layout/List";
import ListItem from "@/components/layout/ListItem";
import { Section } from "@/components/layout/Section";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import { useThemeColors } from "@/contexts/ThemeColors";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { LineChart } from "react-native-gifted-charts";

const DashboardScreen = () => {
  const colors = useThemeColors();

  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  // Mock data for charts
  const salesData = [
    { value: 13000, label: "Mon" },
    { value: 16500, label: "Tue" },
    { value: 14750, label: "Wed" },
    { value: 19000, label: "Thu" },
    { value: 18000, label: "Fri" },
    { value: 21000, label: "Sat" },
    { value: 22000, label: "Sun" },
  ];

  const visitsData = [
    { value: 500, label: "Mon" },
    { value: 800, label: "Tue" },
    { value: 600, label: "Wed" },
    { value: 1000, label: "Thu" },
    { value: 900, label: "Fri" },
    { value: 1200, label: "Sat" },
    { value: 1100, label: "Sun" },
  ];

  const StatCard = ({
    title,
    value,
    trend,
  }: {
    title: string;
    value: string;
    trend?: {
      value: string;
      positive: boolean;
    };
  }) => (
    <CustomCard rounded="lg" className="flex-1 p-global " border>
      <View className="flex-row items-start justify-between">
        <View>
          <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
            {title}
          </ThemedText>
          <ThemedText className="text-xl font-bold">{value}</ThemedText>
        </View>
      </View>
      {trend && (
        <View className="mr-auto mt-2 flex-row items-center rounded-full bg-black/5 px-3 py-1 dark:bg-black/30">
          <Icon
            name={trend.positive ? "TrendingUp" : "TrendingDown"}
            size={14}
            color={trend.positive ? "#22c55e" : "#ef4444"}
          />
          <ThemedText
            className={`ml-1 text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}
          >
            {trend.value}
          </ThemedText>
        </View>
      )}
    </CustomCard>
  );

  const ChartCard = ({
    title,
    data,
    color,
  }: {
    title: string;
    data: any;
    color: string;
  }) => (
    <CustomCard border rounded="lg" className=" mt-4 p-4">
      <ThemedText className="text-lg font-semibold">{title}</ThemedText>
      <View className="py-4">
        <LineChart
          areaChart
          startFillColor={color}
          endFillColor={color}
          startOpacity={0.4}
          endOpacity={0.1}
          rulesColor={colors.border}
          rulesType="SOLID"
          noOfSections={4}
          yAxisThickness={0}
          hideYAxisText
          data={data}
          color={color}
          thickness={3}
          spacing={48}
          initialSpacing={10}
          curved
          xAxisLabelTextStyle={{ color: colors.text }}
          dataPointsColor={color}
          dataPointsRadius={5}
          pointerConfig={{
            pointerStripColor: color,
            pointerColor: color,
            radius: 5,
            pointerLabelWidth: 100,
            pointerLabelHeight: 40,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any[]) => {
              return (
                <View
                  style={{
                    backgroundColor: colors.bg,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <ThemedText className="font-bold">
                    {items[0].value}
                  </ThemedText>
                </View>
              );
            },
          }}
        />
      </View>
    </CustomCard>
  );

  return (
    <>
      <Header
        title=" "
        showBackButton
        rightComponents={[
          <Button
            key="filter-button"
            title="Past 7 days"
            variant="outline"
            size="small"
            iconStart="Calendar"
            onPress={() => actionSheetRef.current?.show()}
          />,
        ]}
      />
      <ThemedScroller>
        <Section
          title="Anlytics"
          titleSize="3xl"
          className="mb-10 mt-6"
          subtitle="Welcome back, John Doe"
        />

        {/* Stats Row 1 */}
        <View className="mb-6 w-full flex-row">
          <StatCard
            title="Revenue"
            value="$10,923.00"
            trend={{ value: "+20.2%", positive: true }}
          />
          <View className="w-2" />

          <StatCard
            title="Orders"
            value="1,240"
            trend={{ value: "+8.2%", positive: true }}
          />
        </View>

        <CardScroller title="Top Customers">
          <CustomCard
            key="customer-1"
            className="w-32 items-center py-6"
            border
          >
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/128.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Jessica Alba
            </ThemedText>
          </CustomCard>
          <CustomCard
            key="customer-2"
            className="w-32 items-center py-6"
            border
          >
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/120.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Cate Who
            </ThemedText>
          </CustomCard>
          <CustomCard
            key="customer-3"
            className="w-32 items-center py-6"
            border
          >
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/121.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Jamie Jones
            </ThemedText>
          </CustomCard>
          <CustomCard
            key="customer-4"
            className="w-32 items-center py-6"
            border
          >
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/102.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Sam Smith
            </ThemedText>
          </CustomCard>
          <CustomCard
            key="customer-5"
            className="w-32 items-center py-6"
            border
          >
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/105.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Chloe Smoke
            </ThemedText>
          </CustomCard>
        </CardScroller>

        {/* Charts */}
        <ChartCard title="Revenue Overview" data={salesData} color="#0ea5e9" />
        <ChartCard title="Visits Overview" data={visitsData} color="#8b5cf6" />

        <Section title="Best Sellers" titleSize="lg" className="mb-10 mt-6">
          <List variant="divided" className="mt-4">
            <ListItem
              href="/screens/product-detail"
              className="py-4"
              leading={
                <Image
                  source={{ uri: "https://tinyurl.com/25c9cyps" }}
                  className="h-16 w-16 rounded-lg"
                />
              }
              title="Nice car"
              subtitle="100 sales"
              trailing={<Icon name="ChevronRight" size={16} />}
            />
            <ListItem
              href="/screens/product-detail"
              className="py-4"
              leading={
                <Image
                  source={{ uri: "https://tinyurl.com/24fts664" }}
                  className="h-16 w-16 rounded-lg"
                />
              }
              title="Pixel Watch"
              subtitle="100 sales"
              trailing={<Icon name="ChevronRight" size={16} />}
            />
            <ListItem
              href="/screens/product-detail"
              className="py-4"
              leading={
                <Image
                  source={{ uri: "https://tinyurl.com/29usuw5m" }}
                  className="h-16 w-16 rounded-lg"
                />
              }
              title="Headphones"
              subtitle="100 sales"
              trailing={<Icon name="ChevronRight" size={16} />}
            />
          </List>
        </Section>
      </ThemedScroller>

      <ActionSheetThemed
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="px-4 pb-8 pt-4">
          <TouchableOpacity className="py-3">
            <ThemedText>7 Days</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <ThemedText>30 Days </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <ThemedText>3 Months </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <ThemedText>1 Year </ThemedText>
          </TouchableOpacity>
        </View>
      </ActionSheetThemed>
    </>
  );
};

export default DashboardScreen;
