import Avatar from "@/components/Avatar";
import { Chip } from "@/components/Chip";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import ThemedText from "@/components/ThemedText";
import ThemeFlatList from "@/components/ThemeFlatList";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
// Order status types
type OrderStatus = "all" | "pending" | "completed" | "cancelled";

// Order data structure
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
  items: number;
  total: string;
  avatar: string;
  name: string;
}

// Sample order data with image arrays added
const orderData: Order[] = [
  {
    id: "1",
    orderNumber: "#ORD-12345",
    date: "May 12, 2025",
    status: "pending",
    items: 3,
    total: "$129.99",
    avatar: "https://mighty.tools/mockmind-api/content/human/128.jpg",
    name: "John Doe",
  },
  {
    id: "2",
    orderNumber: "#ORD-12346",
    date: "May 10, 2025",
    status: "completed",
    items: 2,
    total: "$89.95",
    avatar: "https://mighty.tools/mockmind-api/content/human/120.jpg",
    name: "John Doe",
  },
  {
    id: "3",
    orderNumber: "#ORD-12347",
    date: "May 8, 2025",
    status: "cancelled",
    items: 1,
    total: "$59.99",
    avatar: "https://mighty.tools/mockmind-api/content/human/121.jpg",
    name: "John Doe",
  },
  {
    id: "4",
    orderNumber: "#ORD-12348",
    date: "May 5, 2025",
    status: "completed",
    items: 4,
    total: "$214.50",
    avatar: "https://mighty.tools/mockmind-api/content/human/122.jpg",
    name: "John Doe",
  },
  {
    id: "5",
    orderNumber: "#ORD-12349",
    date: "May 1, 2025",
    status: "pending",
    items: 2,
    total: "$108.75",
    avatar: "https://mighty.tools/mockmind-api/content/human/123.jpg",
    name: "John Doe",
  },
  {
    id: "6",
    orderNumber: "#ORD-12350",
    date: "April 29, 2025",
    status: "completed",
    items: 1,
    total: "$45.99",
    avatar: "https://mighty.tools/mockmind-api/content/human/124.jpg",
    name: "John Doe",
  },
  {
    id: "7",
    orderNumber: "#ORD-12351",
    date: "April 25, 2025",
    status: "cancelled",
    items: 3,
    total: "$135.50",
    avatar: "https://mighty.tools/mockmind-api/content/human/125.jpg",
    name: "John Doe",
  },
  {
    id: "8",
    orderNumber: "#ORD-12352",
    date: "April 22, 2025",
    status: "completed",
    items: 5,
    total: "$249.99",
    avatar: "https://mighty.tools/mockmind-api/content/human/126.jpg",
    name: "John Doe",
  },
];

// Get status icon and color
const getStatusDetails = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return {
        color: "text-white",
        bgColor: "bg-yellow-500",
      };
    case "completed":
      return {
        color: "text-white",
        bgColor: "bg-green-500",
      };
    case "cancelled":
      return {
        color: "text-white",
        bgColor: "bg-red-500",
      };
    default:
      return {
        color: "text-white",
        bgColor: "bg-gray-500",
      };
  }
};

// New OrderItem component
interface OrderItemProps {
  order: Order;
  onPress: () => void;
}

// Define mock product structure
interface MockProduct {
  image: any;
  title: string;
  size: string;
  price: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onPress }) => {
  const statusDetails = getStatusDetails(order.status);

  // Get mock products with titles, sizes and prices
  const getMockProducts = (itemCount: number): MockProduct[] => {
    const productOptions = [
      {
        image: require("@/assets/img/male.jpg"),
        title: "Premium Cotton T-Shirt",
        sizeOptions: ["S", "M", "L", "XL"],
        priceRange: [24.99, 29.99, 34.99],
      },
      {
        image: require("@/assets/img/male-2.jpg"),
        title: "Casual Denim Jacket",
        sizeOptions: ["M", "L", "XL"],
        priceRange: [59.99, 69.99, 79.99],
      },
      {
        image: require("@/assets/img/female-1.jpg"),
        title: "Floral Summer Dress",
        sizeOptions: ["XS", "S", "M"],
        priceRange: [39.99, 44.99, 49.99],
      },
      {
        image: require("@/assets/img/female-2.jpg"),
        title: "Classic Denim Jeans",
        sizeOptions: ["28", "30", "32", "34"],
        priceRange: [49.99, 54.99, 59.99],
      },
    ];

    // Add products based on the items count, but max 3
    const count = Math.min(itemCount, 3);
    const products: MockProduct[] = [];

    for (let i = 0; i < count; i++) {
      // Pick a random product option
      const productOption =
        productOptions[Math.floor(Math.random() * productOptions.length)];

      // Create a product with random size and price
      products.push({
        image: productOption.image,
        title: productOption.title,
        size: productOption.sizeOptions[
          Math.floor(Math.random() * productOption.sizeOptions.length)
        ],
        price: `$${productOption.priceRange[Math.floor(Math.random() * productOption.priceRange.length)]}`,
      });
    }

    return products;
  };

  const mockProducts = getMockProducts(order.items);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className=" border-b-8 border-light-secondary bg-light-primary px-global py-6 active:bg-light-secondary/10 dark:border-dark-darker dark:bg-dark-primary dark:active:bg-dark-secondary/10"
    >
      <View className="mb-3 flex-row items-center justify-between border-b border-light-secondary pb-3 dark:border-dark-secondary">
        <View className="flex-row items-center">
          <Avatar src={order.avatar} size="sm" />
          <ThemedText className="ml-2 text-base font-semibold">
            {order.name}
          </ThemedText>
        </View>
        <View
          className={`flex-row items-center rounded-full px-2 py-1 ${statusDetails.bgColor}`}
        >
          <ThemedText className={`text-xs capitalize ${statusDetails.color}`}>
            {order.status}
          </ThemedText>
        </View>
      </View>

      {/* Product items */}
      <View className="mt-1 space-y-3">
        {mockProducts.map((product, index) => (
          <View key={index} className="flex-row">
            <Image source={product.image} className="h-24 w-16 rounded-md" />
            <View className="ml-3 flex-1 justify-center">
              <ThemedText className="font-semibold" numberOfLines={1}>
                {product.title}
              </ThemedText>
              <View className="mt-1 flex-row items-center gap-2">
                <ThemedText className="mt-1 text-sm">
                  {product.price}
                </ThemedText>
                <View className="h-3 w-px bg-light-secondary dark:bg-dark-secondary" />
                <ThemedText className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                  Size: {product.size}
                </ThemedText>
              </View>
            </View>
          </View>
        ))}

        {order.items > 3 && (
          <ThemedText className="text-sm italic text-light-subtext dark:text-dark-subtext">
            +{order.items - 3} more items
          </ThemedText>
        )}
      </View>

      <View className="mt-4 flex-row items-center justify-between border-t border-light-secondary pt-3 dark:border-dark-secondary">
        <View className="flex-row items-center">
          <ThemedText className="mr-4 text-sm text-light-subtext dark:text-dark-subtext">
            {order.date}
          </ThemedText>
        </View>
        <View className="flex-row items-center">
          <ThemedText className="mr-2 text-base font-bold">
            {order.total}
          </ThemedText>
          <Icon name="ChevronRight" size={18} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function OrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("all");

  // Filter orders based on the selected status
  const filteredOrders =
    selectedStatus === "all"
      ? orderData
      : orderData.filter((order) => order.status === selectedStatus);

  const handleOrderPress = (orderId: string) => {
    router.push(`/screens/order-detail?id=${orderId}`);
  };

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header title="Orders" showBackButton />

      {/* Status filter chips */}
      <View className="flex-row flex-wrap gap-2 px-global py-4">
        <Chip
          label="All"
          isSelected={selectedStatus === "all"}
          onPress={() => setSelectedStatus("all")}
        />
        <Chip
          label="Pending"
          isSelected={selectedStatus === "pending"}
          onPress={() => setSelectedStatus("pending")}
        />
        <Chip
          label="Completed"
          isSelected={selectedStatus === "completed"}
          onPress={() => setSelectedStatus("completed")}
        />
        <Chip
          label="Cancelled"
          isSelected={selectedStatus === "cancelled"}
          onPress={() => setSelectedStatus("cancelled")}
        />
      </View>

      {/* Order list */}
      {filteredOrders.length > 0 ? (
        <ThemeFlatList
          className="px-0"
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 4, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <OrderItem order={item} onPress={() => handleOrderPress(item.id)} />
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Icon
            name="ShoppingBag"
            size={64}
            className="mb-4 text-light-secondary dark:text-dark-secondary"
          />
          <ThemedText className="mb-2 text-xl font-bold">
            No orders found
          </ThemedText>
          <ThemedText className="text-center text-light-subtext dark:text-dark-subtext">
            There are no {selectedStatus !== "all" ? selectedStatus : ""} orders
            to display
          </ThemedText>
        </View>
      )}
    </View>
  );
}
