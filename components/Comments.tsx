import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { View, Text, Image } from "react-native";

const Comments = () => {
  return (
    <View>
      {/* reviewer name */}
      <View className="flex flex-row items-center mt-5 gap-3">
        <Image source={images.avatar} className="size-16" />
        <Text className="text-xl font-rubik-bold">John Martin</Text>
      </View>

      {/* review */}
      <View className="mt-3">
        <Text className="font-rubik text-black-200">
          The apartment is very clean and modern. I really like the interior
          design. Looks like I'll feel at home 😍.
        </Text>
      </View>

      {/* likes */}
      <View className="flex flex-row items-center justify-between mt-5">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={icons.heart}
            className="size-7"
            tintColor={"#0061FF"}
          />
          <Text className="font-rubik-bold">432</Text>
        </View>
        <Text className="font-rubik text-black-200">6 days ago</Text>
      </View>
    </View>
  );
};

export default Comments;
