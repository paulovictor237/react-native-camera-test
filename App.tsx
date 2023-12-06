import React from 'react';
import {Button, View} from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="h-20 aspect-[3/1] rounded-lg border-2 border-gray-500" />
      <View className="mb-4" />
      <Button onPress={() => {}} title="clique aqui" />
    </View>
  );
}
