import {OCRFrame, scanOCR} from '@ismaelmoreiraa/vision-camera-ocr';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  useCameraPermission,
  useMicrophonePermission,
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets} from 'react-native-worklets-core';

export function HomeScreen() {
  const device = useCameraDevice('front');
  const [active, setActive] = useState(false);

  const permiesion1 = useCameraPermission();
  const permiesion2 = useMicrophonePermission();
  const hasPermission = permiesion2.hasPermission || permiesion1.hasPermission;

  const [result, setResult] = useState<string[]>([]);

  const onFaceDetected = Worklets.createRunInJsFn((face: OCRFrame) => {
    const words = face.result.blocks
      .map(block => block.text.split(/\s+/))
      .flat();
    console.log('🐞 ~ words:', words);
    setResult([...new Set(words)]);
  });

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    onFaceDetected(data);
  }, []);

  useEffect(() => {
    if (!permiesion1.hasPermission) permiesion1.requestPermission();
    if (!permiesion2.hasPermission) permiesion2.requestPermission();
  }, []);

  if (device == null || !hasPermission) return <Text>Camera Error</Text>;

  return (
    <View className="flex-1 bg-red-300">
      {active && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          photo={true}
          // fps={2}
          pixelFormat="yuv"
          frameProcessor={frameProcessor}
          isActive={active}
        />
      )}
      <View className="items-center justify-center flex-1">
        <View className="mb-4 h-20 aspect-[3/1] rounded-lg border-4 border-gray-500" />
        <Button
          onPress={() => setActive(p => !p)}
          title={active ? 'Desativar Camera' : 'Ativar Camera'}
        />
      </View>

      <View className="bg-gray-500 p-4 min-h-[140px] rounded-2xl">
        {result.length === 0 && (
          <Text className="bg-red-500 p-2 rounded-lg text-xl uppercase self-center text-white">
            nada por enquanto
          </Text>
        )}
        <View className="flex-row flex-wrap gap-2">
          {result.map(word => (
            <Text
              key={word}
              className="bg-green-500 p-2 rounded-lg text-base lowercase whitespace-nowrap">
              {word}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
