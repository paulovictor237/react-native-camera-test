import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {
  useCameraPermission,
  useMicrophonePermission,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';

export default function App() {
  const device = useCameraDevice('back');

  const permiesion1 = useCameraPermission();
  const permiesion2 = useMicrophonePermission();

  useEffect(() => {
    if (!permiesion1.hasPermission) {
      permiesion1.requestPermission();
    }
    if (!permiesion2.hasPermission) {
      permiesion2.requestPermission();
    }
  }, [permiesion1, permiesion2]);

  const hasPermission = permiesion2.hasPermission || permiesion1.hasPermission;

  if (device == null || !hasPermission) {
    return <Text>Camera Error</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      <View className="mb-4 h-20 aspect-[3/1] rounded-lg border-4 border-gray-500" />
      <Button onPress={() => {}} title="clique aqui" />
      <Animated.View
        className={'bg-violet-500 rounded-lg p-4 mt-4'}
        entering={ZoomIn.duration(2000).delay(500)}>
        <Text>Animação</Text>
      </Animated.View>
    </View>
  );
}
