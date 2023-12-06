import React from 'react';
import {Button, Text, View} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="h-20 aspect-[3/1] rounded-lg border-2 border-gray-500" />
      <View className="mb-4" />
      <Button onPress={() => {}} title="clique aqui" />
      <Animated.View
        className={'bg-violet-500 rounded-lg p-4 mt-4'}
        entering={ZoomIn.duration(2000).delay(500)}>
        <Text>Animação</Text>
      </Animated.View>
    </View>
  );
}
