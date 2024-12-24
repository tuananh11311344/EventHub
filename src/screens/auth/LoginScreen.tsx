import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SpaceComponent } from '../../components'

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <SpaceComponent height={16}/>
      <Button title="Login" onPress={async() => await AsyncStorage.setItem('assetToken', '123')}/>
    </View>
  )
}

export default LoginScreen