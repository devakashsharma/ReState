import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Text>Property {id}</Text> */}
      <View className="relative w-full h-1/3" style={{ height: 400 }}>
        <Image source={images.japan} className="size-full contain" />
      </View>
      <View className="absolute flex flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="size-7" />
        </TouchableOpacity>
        <View className="relative right-[-250px] flex flex-row items-center gap-3">
          <Image
            source={icons.heart}
            className="size-7"
            tintColor={"#191D31"}
          />
          <Image source={icons.send} className="size-7" />
        </View>
      </View>

      <View className="details">
        
      </View>
    </ScrollView>
  );
};

export default Property;
