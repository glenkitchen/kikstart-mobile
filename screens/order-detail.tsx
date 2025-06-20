
import AnimatedView from "@/components/AnimatedView";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { Divider } from "@/components/layout/Divider";
import { Section } from "@/components/layout/Section";
import ThemedText from "@/components/ThemedText";
import ThemedFooter from "@/components/ThemeFooter";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, View } from "react-native";

// Order status types
type OrderStatus = "pending" | "completed" | "cancelled";

// Simplified order product interface
interface OrderProduct {
  id: string;
  name: string;
  image: any;
  price: string;
  quantity: number;
  size?: string;
  color?: string;
}

// Order data structure
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderProduct[];
  subtotal: string;
  shipping: string;
  discount?: string;
  tax: string;
  total: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: {
    type: "credit_card" | "paypal" | "apple_pay";
    details: string;
  };
  timeline: {
    ordered: string;
    processed?: string;
    shipped?: string;
    delivered?: string;
    cancelled?: string;
  };
}

// Sample orders data
const ordersData: Order[] = [
  {
    id: "1",
    orderNumber: "#ORD-12345",
    date: "May 12, 2025",
    status: "pending",
    items: [
      {
        id: "prod1",
        name: "Premium Cotton T-Shirt",
        image: require("@/assets/img/male-2.jpg"),
        price: "$29.99",
        quantity: 2,
        size: "M",
        color: "Black",
      },
      {
        id: "prod2",
        name: "Classic Denim Jeans",
        image: require("@/assets/img/female-2.jpg"),
        price: "$59.99",
        quantity: 1,
        size: "32",
        color: "Blue",
      },
    ],
    subtotal: "$119.97",
    shipping: "$10.00",
    discount: "-$20.00",
    tax: "$20.02",
    total: "$129.99",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    paymentMethod: {
      type: "credit_card",
      details: "Visa •••• 1234",
    },
    timeline: {
      ordered: "May 12, 2025 09:15 AM",
      processed: "May 12, 2025 11:30 AM",
    },
  },
  {
    id: "2",
    orderNumber: "#ORD-12346",
    date: "May 10, 2025",
    status: "completed",
    items: [
      {
        id: "prod3",
        name: "Leather Sneakers",
        image: require("@/assets/img/female-1.jpg"),
        price: "$89.95",
        quantity: 1,
        size: "42",
        color: "White",
      },
    ],
    subtotal: "$89.95",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$89.95",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    paymentMethod: {
      type: "paypal",
      details: "john.doe@example.com",
    },
    timeline: {
      ordered: "May 10, 2025 14:22 PM",
      processed: "May 10, 2025 16:35 PM",
      shipped: "May 11, 2025 08:45 AM",
      delivered: "May 12, 2025 10:30 AM",
    },
  },
  {
    id: "3",
    orderNumber: "#ORD-12347",
    date: "May 8, 2025",
    status: "cancelled",
    items: [
      {
        id: "prod4",
        name: "Wool Sweater",
        image: require("@/assets/img/male-2.jpg"),
        price: "$59.99",
        quantity: 1,
        size: "L",
        color: "Gray",
      },
    ],
    subtotal: "$59.99",
    shipping: "$5.00",
    tax: "$0.00",
    total: "$59.99",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    paymentMethod: {
      type: "credit_card",
      details: "Mastercard •••• 5678",
    },
    timeline: {
      ordered: "May 8, 2025 16:43 PM",
      cancelled: "May 9, 2025 11:20 AM",
    },
  },
];

// Get status color and icon
const getStatusDetails = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return {
        color: "text-white",
        bgColor: "bg-yellow-500",
        label: "Pending",
      };
    case "completed":
      return {
        color: "text-white",
        bgColor: "bg-green-500",
        label: "Completed",
      };
    case "cancelled":
      return {
        color: "text-white",
        bgColor: "bg-red-500",
        label: "Cancelled",
      };
    default:
      return {
        color: "text-white",
        bgColor: "bg-gray-500",
        label: "Unknown",
      };
  }
};

export default function OrderDetailScreen() {
  const { id, fromCheckout } = useLocalSearchParams<{
    id: string;
    fromCheckout?: string;
  }>();
  const isFromCheckout = fromCheckout === "true";

  // Find the order by id
  const order = useMemo(() => {
    return ordersData.find((order) => order.id === id);
  }, [id]);

  if (!order) {
    return (
      <View className="flex-1 bg-light-primary dark:bg-dark-primary">
        <Header
          title="Order Details"
          showBackButton
          //onBackPress={isFromCheckout ? handleBackPress : undefined}
        />
        <View className="flex-1 items-center justify-center px-6">
          <Icon
            name="ShoppingBag"
            size={64}
            className="mb-4 text-light-secondary dark:text-dark-secondary"
          />
          <ThemedText className="mb-2 text-xl font-bold">
            Order not found
          </ThemedText>
          <ThemedText className="text-center text-light-subtext dark:text-dark-subtext">
            The order you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </ThemedText>
        </View>
      </View>
    );
  }

  const statusDetails = getStatusDetails(order.status);

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header
        showBackButton
        //onBackPress={isFromCheckout ? handleBackPress : undefined}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <AnimatedView animation="fadeIn" duration={400} delay={100}>
          {/* Order header */}
          <View className="px-global pb-6 pt-4">
            <View className="mb-2 flex-row items-center justify-between">
              <View>
                <ThemedText className="text-base">
                  {order.orderNumber}
                </ThemedText>
                <ThemedText className="text-xl font-bold">
                  {order.date}
                </ThemedText>
              </View>
              <View
                className={`flex-row items-center rounded-full px-3 py-1 ${statusDetails.bgColor}`}
              >
                <ThemedText
                  className={`text-sm font-medium ${statusDetails.color}`}
                >
                  {statusDetails.label}
                </ThemedText>
              </View>
            </View>
          </View>

          <Divider className="h-1 bg-light-secondary dark:bg-dark-darker" />

          {/* Order items */}
          <Section titleSize="lg" className="px-global pt-4">
            {order.items.map((item, index) => (
              <View
                key={item.id}
                className={`flex-row py-3 ${index !== order.items.length - 1 ? "border-b border-light-secondary dark:border-dark-secondary" : ""}`}
              >
                <Image
                  source={item.image}
                  className="h-28 w-20 rounded-lg"
                  resizeMode="cover"
                />
                <View className="ml-3 flex-1 justify-center">
                  <ThemedText className="text-base font-semibold">
                    {item.name}
                  </ThemedText>

                  {(item.size || item.color) && (
                    <ThemedText className="mt-px text-sm text-light-subtext dark:text-dark-subtext">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && ` • `}
                      {item.color && `Color: ${item.color}`}
                    </ThemedText>
                  )}

                  <View className="mt-2 flex-row items-center justify-between">
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                      Qty: {item.quantity}
                    </ThemedText>
                    <ThemedText className="font-bold">{item.price}</ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </Section>

          <Divider className="mt-4 h-1 bg-light-secondary dark:bg-dark-darker" />

          {/* Order summary */}
          <Section
            title="Order Summary"
            titleSize="lg"
            className="px-global pt-4"
          >
            <View className="mt-2 space-y-2">
              <View className="flex-row justify-between">
                <ThemedText className="text-light-subtext dark:text-dark-subtext">
                  Subtotal
                </ThemedText>
                <ThemedText>{order.subtotal}</ThemedText>
              </View>

              <View className="flex-row justify-between">
                <ThemedText className="text-light-subtext dark:text-dark-subtext">
                  Shipping
                </ThemedText>
                <ThemedText>{order.shipping}</ThemedText>
              </View>

              {order.discount && (
                <View className="flex-row justify-between">
                  <ThemedText className="text-light-subtext dark:text-dark-subtext">
                    Discount
                  </ThemedText>
                  <ThemedText className="text-green-500">
                    {order.discount}
                  </ThemedText>
                </View>
              )}

              <View className="flex-row justify-between">
                <ThemedText className="text-light-subtext dark:text-dark-subtext">
                  Tax
                </ThemedText>
                <ThemedText>{order.tax}</ThemedText>
              </View>

              <Divider className="my-2" />

              <View className="flex-row justify-between">
                <ThemedText className="text-base font-bold">Total</ThemedText>
                <ThemedText className="text-base font-bold">
                  {order.total}
                </ThemedText>
              </View>
            </View>
          </Section>

          <Divider className="mt-4 h-1 bg-light-secondary dark:bg-dark-darker" />

          {/* Shipping info */}
          <Section
            title="Shipping Address"
            titleSize="lg"
            className="px-global pt-4"
          >
            <View className="mt-2">
              <ThemedText className="font-semibold">
                {order.shippingAddress.name}
              </ThemedText>
              <ThemedText className="mt-1 text-light-subtext dark:text-dark-subtext">
                {order.shippingAddress.street}
              </ThemedText>
              <ThemedText className="text-light-subtext dark:text-dark-subtext">
                {`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`}
              </ThemedText>
              <ThemedText className="text-light-subtext dark:text-dark-subtext">
                {order.shippingAddress.country}
              </ThemedText>
              <ThemedText className="mt-1 text-light-subtext dark:text-dark-subtext">
                {order.shippingAddress.phone}
              </ThemedText>
            </View>
          </Section>

          <Divider className="mt-4 h-1 bg-light-secondary dark:bg-dark-darker" />

          {/* Payment method */}
          <Section
            title="Payment Method"
            titleSize="lg"
            className="px-global pt-4"
          >
            <View className="mt-2 flex-row items-center">
              <Icon
                name={
                  order.paymentMethod.type === "credit_card"
                    ? "CreditCard"
                    : order.paymentMethod.type === "paypal"
                      ? "CreditCard"
                      : "CreditCard"
                }
                size={20}
                className="mr-2"
              />
              <ThemedText>{order.paymentMethod.details}</ThemedText>
            </View>
          </Section>

          <Divider className="mt-4 h-1 bg-light-secondary dark:bg-dark-darker" />

          {/* Order timeline */}
          <Section
            title="Order Timeline"
            titleSize="lg"
            className="px-global pb-4 pt-4"
          >
            <View className="mt-6">
              {/* Ordered */}
              <View className="mb-1 flex-row">
                <View className="mr-3 items-center">
                  <View className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <Icon name="ShoppingBag" size={16} color="white" />
                  </View>
                  {(order.timeline.processed ||
                    order.timeline.shipped ||
                    order.timeline.delivered ||
                    order.timeline.cancelled) && (
                    <View className="mt-1 h-12 w-px bg-light-subtext dark:bg-dark-subtext" />
                  )}
                </View>
                <View>
                  <ThemedText className="font-semibold">
                    Order Placed
                  </ThemedText>
                  <ThemedText className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                    {order.timeline.ordered}
                  </ThemedText>
                </View>
              </View>

              {/* Processed */}
              {order.timeline.processed && (
                <View className="mb-1 flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <Icon name="Check" size={16} color="white" />
                    </View>
                    {(order.timeline.shipped || order.timeline.delivered) && (
                      <View className="mt-1 h-12 w-px bg-light-subtext dark:bg-dark-subtext" />
                    )}
                  </View>
                  <View>
                    <ThemedText className="font-semibold">
                      Order Processed
                    </ThemedText>
                    <ThemedText className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                      {order.timeline.processed}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* Shipped */}
              {order.timeline.shipped && (
                <View className="mb-1 flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <Icon name="Truck" size={16} color="white" />
                    </View>
                    {order.timeline.delivered && (
                      <View className="mt-1 h-12 w-px bg-light-subtext dark:bg-dark-subtext" />
                    )}
                  </View>
                  <View>
                    <ThemedText className="font-semibold">
                      Order Shipped
                    </ThemedText>
                    <ThemedText className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                      {order.timeline.shipped}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* Delivered */}
              {order.timeline.delivered && (
                <View className="flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <Icon name="Package" size={16} color="white" />
                    </View>
                  </View>
                  <View>
                    <ThemedText className="font-semibold">
                      Order Delivered
                    </ThemedText>
                    <ThemedText className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                      {order.timeline.delivered}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* Cancelled */}
              {order.timeline.cancelled && (
                <View className="flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-red-500">
                      <Icon name="X" size={16} color="white" />
                    </View>
                  </View>
                  <View>
                    <ThemedText className="font-semibold">
                      Order Cancelled
                    </ThemedText>
                    <ThemedText className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                      {order.timeline.cancelled}
                    </ThemedText>
                  </View>
                </View>
              )}
            </View>
          </Section>
        </AnimatedView>
      </ScrollView>

      {/* Actions */}
      {order.status !== "cancelled" && (
        <ThemedFooter>
          {order.status === "pending" ? (
            <View className="flex-row space-x-3">
              <Button
                title="Cancel Order"
                variant="outline"
                className="flex-1"
              />
              <Button
                title="Track Order"
                variant="outline"
                className="flex-1"
              />
              <Button
                title="Review"
                href="/screens/review"
                className="flex-1"
              />
            </View>
          ) : (
            <Button
              title="Leave a Review"
              href="/screens/review"
              className="w-full"
            />
          )}
        </ThemedFooter>
      )}
    </View>
  );
}
