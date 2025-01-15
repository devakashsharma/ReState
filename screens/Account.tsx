import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";

export default function Account() {
    const { user, refetch } = useGlobalContext();
  return (
    <SafeAreaView className='m-7'>
        <View>
            <Text>Profile</Text>
            <View>
                <Image source={{uri: user?.avatar}} />
            </View>
        </View>
      <Text>Account</Text>
    </SafeAreaView>
  )
}