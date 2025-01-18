import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import icons from "@/constants/icons";

export default function Notifications() {
  return (
    <SafeAreaView className="min-h-screen bg-white">
      <View className="m-7">
        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>

          <Text className="items-center text-3xl font-rubik-bold">
            Notification
          </Text>
        </View>

        <View className="flex items-center justify-center mt-8 border-t border-gray-300 p-5">
          <Text className="text-lg text-black-200">
            You don't have any notification.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
