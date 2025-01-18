import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import { router } from "expo-router";

export default function Account() {
  const { user, refetch } = useGlobalContext();
  return (
    <SafeAreaView className="m-7">
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
        >
          <Image source={icons.backArrow} className="size-5" />
        </TouchableOpacity>

        <Text className="items-center text-3xl font-rubik-bold">Profile</Text>
      </View>
      <View className="flex-row justify-center flex mt-5">
        <View className="flex flex-col items-center relative mt-5">
          <Image
            source={{ uri: user?.avatar }}
            className="size-44 relative rounded-full"
          />
          <TouchableOpacity className="absolute bottom-1 right-2">
            <Image source={icons.edit} className="size-9" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-10 border-t border-gray-300 p-5">
        <View className="flex flex-row gap-6 items-start">
          <Image source={icons.person} className="size-6" />
          <View className="flex flex-col">
            <Text className="text-base font-rubik text-black-200">Name</Text>
            <Text className="text-lg font-rubik-medium">{user?.name}</Text>
          </View>
        </View>

        <View className="mt-3 flex flex-row gap-6 items-start">
          <Image source={icons.send} className="size-6" />
          <View>
            <Text className="text-base font-rubik text-black-200">Email</Text>
            <Text className="text-lg font-rubik-medium">{user?.email}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
