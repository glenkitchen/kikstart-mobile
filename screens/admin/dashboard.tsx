import ActionSheetThemed from "@/components/ActionSheetThemed";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/Button";
import { CardScroller } from "@/components/CardScroller";
import CustomCard from "@/components/CustomCard";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import List from "@/components/layout/List";
import ListItem from "@/components/layout/ListItem";
import { Section } from "@/components/layout/Section";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { LineChart } from "react-native-chart-kit";
import useThemeColors from "../../contexts/ThemeColors";

const DashboardScreen = () => {
  const colors = useThemeColors();
  const screenWidth = Dimensions.get("window").width;
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState({ value: 0, x: 0, y: 0 });
  // Mock data for charts
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [13000, 16500, 14750, 19000, 18000, 21000, 22000],
      },
    ],
  };

  const visitsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [500, 800, 600, 1000, 900, 1200, 1100],
      },
    ],
  };

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
    <CustomCard rounded="lg" className="p-global flex-1 " border>
      <View className="flex-row items-start justify-between">
        <View>
          <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
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
    <CustomCard border rounded="lg" className=" mt-4 pt-4">
      <ThemedText className="text-lg font-semibold">{title}</ThemedText>
      <View className="-ml-[50px]">
        <LineChart
          data={data}
          width={screenWidth - 0}
          height={220}
          withVerticalLabels={true}
          withHorizontalLabels={false}
          withDots={true}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withShadow={true}
          bezier
          decorator={() => {
            return tooltipVisible ? (
              <View
                style={[
                  styles.tooltip,
                  {
                    backgroundColor: "black",
                    left: tooltipData.x - 40,
                    top: tooltipData.y - 50,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>${tooltipData.value}</Text>
              </View>
            ) : null;
          }}
          onDataPointClick={({ value, x, y, getColor }) => {
            // Show tooltip with value
            setTooltipData({ value, x, y });
            setTooltipVisible(true);

            // Hide tooltip after 3 seconds
            setTimeout(() => {
              setTooltipVisible(false);
            }, 3000);
          }}
          chartConfig={{
            backgroundColor: colors.bg,
            backgroundGradientFrom: colors.bg,
            backgroundGradientTo: colors.bg,
            decimalPlaces: 0,
            color: (opacity = 1) =>
              `${color}${Math.round(opacity * 255)
                .toString(16)
                .padStart(2, "0")}`,
            labelColor: () => colors.text,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: color,
            },
            propsForBackgroundLines: {
              strokeDasharray: "", // Solid grid lines
              stroke: colors.text,
              strokeOpacity: 0.1,
            },
          }}
          style={{
            marginVertical: 0,
            marginHorizontal: 0,
            paddingHorizontal: 0,
          }}
        />
      </View>
    </CustomCard>
  );

  const styles = StyleSheet.create({
    tooltip: {
      position: "absolute",
      backgroundColor: colors.bg,
      borderRadius: 8,
      color: "white",
      padding: 8,
      minWidth: 80,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    tooltipText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <>
      <Header
        title=" "
        showBackButton
        rightComponents={[
          <Button
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
          <CustomCard className="w-32 items-center py-6" border>
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/128.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Jessica Alba
            </ThemedText>
          </CustomCard>
          <CustomCard className="w-32 items-center py-6" border>
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/120.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Cate Who
            </ThemedText>
          </CustomCard>
          <CustomCard className="w-32 items-center py-6" border>
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/121.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Jamie Jones
            </ThemedText>
          </CustomCard>
          <CustomCard className="w-32 items-center py-6" border>
            <Avatar
              src="https://mighty.tools/mockmind-api/content/human/102.jpg"
              size="md"
              className="mb-2"
            />
            <ThemedText className="text-center text-xs font-semibold">
              Sam Smith
            </ThemedText>
          </CustomCard>
          <CustomCard className="w-32 items-center py-6" border>
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
