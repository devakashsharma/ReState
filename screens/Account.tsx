import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";

export default function Account() {
    const { user, refetch } = useGlobalContext();
  return (
    <SafeAreaView className='m-7 w-full h-full flex flex-col justify-center'>
        <View className='flex flex-col justify-center items-center'>
            <Text className='text-3xl font-rubik-bold'>Profile</Text>
            <View>
                <Image source={{uri: user?.avatar}} className='size-44 rounded-full' />
            </View>
        </View>
      <View className='flex flex-col justify-start items-start gap-3'>
        <View className='flex flex-col'>
          <Text className='text-lg font-rubik'>Name</Text>
          <Text className='text-xl font-rubik-bold'>{user?.name}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}