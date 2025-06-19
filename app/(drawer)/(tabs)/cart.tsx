import { Button } from "@/components/Button";
import ConfirmationModal from "@/components/ConfirmationModal";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import React, { RefObject, useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Blue t-shirt",
      price: 29.99,
      image: require("@/assets/img/female-1.jpg"),
      quantity: 1,
    },
    {
      id: 2,
      name: "Orange t-shirt",
      price: 19.99,
      image: require("@/assets/img/female-2.jpg"),
      quantity: 1,
    },
  ]);
  const confirmationRef = useRef<ActionSheetRef>(null);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const shipping = 5.99;
  const discount = 10; // 10% discount

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setItemToRemove(id);
    confirmationRef.current?.show();
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      setCartItems((items) => items.filter((item) => item.id !== itemToRemove));
      setItemToRemove(null);
    }
  };

  const cancelRemove = () => {
    setItemToRemove(null);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + shipping;

  return (
    <>
      <Header
        title="Your cart"
        rightComponents={[
          <Button key="checkout" title="Checkout" href="/screens/checkout" />,
        ]}
      />

      <ThemedScroller>
        {cartItems.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center border-b border-light-secondary py-4 dark:border-dark-secondary"
          >
            <Image
              source={item.image}
              className="h-28 w-20 rounded-lg bg-light-secondary dark:bg-dark-secondary"
            />
            <View className="ml-6 flex-1">
              <ThemedText className="font-bold">{item.name}</ThemedText>
              <ThemedText className="text-light-subtext dark:text-dark-subtext">
                ${item.price.toFixed(2)}
              </ThemedText>
              <View className="mt-2 flex-row items-center">
                <Pressable
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-6 w-6 items-center justify-center rounded-full bg-light-secondary dark:bg-dark-secondary"
                >
                  <Icon name="Minus" size={14} />
                </Pressable>
                <ThemedText className="mx-2">{item.quantity}</ThemedText>
                <Pressable
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-6 w-6 items-center justify-center rounded-full bg-light-secondary dark:bg-dark-secondary"
                >
                  <Icon name="Plus" size={12} />
                </Pressable>
                <Pressable
                  onPress={() => handleRemoveItem(item.id)}
                  className="ml-auto opacity-30"
                >
                  <Icon name="Trash2" size={20} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <View className=" mt-4 pt-4">
          <View className="mb-2 flex-row justify-between">
            <ThemedText className="text-base">Subtotal</ThemedText>
            <ThemedText className="text-base">
              ${subtotal.toFixed(2)}
            </ThemedText>
          </View>
          <View className="mb-2 flex-row justify-between">
            <ThemedText className="text-base">Shipping</ThemedText>
            <ThemedText className="text-base">
              ${shipping.toFixed(2)}
            </ThemedText>
          </View>
          <View className="mb-2 flex-row justify-between">
            <ThemedText className="text-base">
              Discount ({discount}%)
            </ThemedText>
            <ThemedText className="text-base">
              -${discountAmount.toFixed(2)}
            </ThemedText>
          </View>
          <View className="mb-4 mt-8 h-[1px] w-full bg-light-secondary dark:bg-dark-secondary" />
          <View className="flex-row justify-between">
            <ThemedText className="text-lg font-bold">Total</ThemedText>
            <ThemedText className="text-lg font-bold">
              ${total.toFixed(2)}
            </ThemedText>
          </View>
        </View>
      </ThemedScroller>

      <ConfirmationModal
        actionSheetRef={confirmationRef as unknown as RefObject<ActionSheetRef>}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        confirmText="Remove"
        cancelText="Cancel"
        isVisible
      />
    </>
  );
};

export default CartScreen;
