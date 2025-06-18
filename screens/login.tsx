import { Button } from "@/components/Button";
import Input from "@/components/forms/Input";
import ThemedText from "@/components/ThemedText";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to home screen after successful login
        router.replace("/(drawer)/(tabs)/");
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-light-primary dark:bg-dark-primary flex-1 p-6"
    >
      <View className="mt-10">
        <ThemedText className="font-outfit-bold mb-14 text-4xl">
          Velora<Text className="text-sky-500">.</Text>
        </ThemedText>
        <ThemedText className="mb-1 text-3xl font-bold">
          Welcome back
        </ThemedText>
        <ThemedText className="text-light-subtext dark:text-dark-subtext mb-14">
          Sign in to your account
        </ThemedText>

        <Input
          label="Email"
          //leftIcon="mail"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) validateEmail(text);
          }}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Input
          label="Password"
          //leftIcon="lock"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) validatePassword(text);
          }}
          error={passwordError}
          isPassword={true}
          autoCapitalize="none"
        />

        <Link
          className="mb-4 text-sm text-black underline dark:text-white"
          href="/screens/forgot-password"
        >
          Forgot Password?
        </Link>

        <Button
          title="Login"
          onPress={handleLogin}
          loading={isLoading}
          size="large"
          className="mb-6"
        />

        <View className="flex-row justify-center">
          <ThemedText className="text-light-subtext dark:text-dark-subtext">
            Don't have an account?{" "}
          </ThemedText>
          <Link href="/screens/signup" asChild>
            <Pressable>
              <ThemedText className="underline">Sign up</ThemedText>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  googleIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#4285F4",
    borderRadius: 2,
  },
});
