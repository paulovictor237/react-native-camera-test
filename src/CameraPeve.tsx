import {OCRFrame, scanOCR} from '@ismaelmoreiraa/vision-camera-ocr';
import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  useCameraPermission,
  useMicrophonePermission,
  Camera,
  useCameraDevice,
  useFrameProcessor,
  CameraPosition,
} from 'react-native-vision-camera';
import {Worklets} from 'react-native-worklets-core';

export function CameraPeve() {
  const [cameraType, setCameraType] = useState<CameraPosition>('front');
  const device = useCameraDevice(cameraType);
  const [active, setActive] = useState(false);
  const camera = useRef<Camera>(null);

  const toggleCamera = () =>
    setCameraType(type => (type === 'front' ? 'back' : 'front'));

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      console.log('🐞 ~ photo:', photo);
    } catch (error) {
      console.log('🐞 ~ error:', error);
    }
  };

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
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          photo={true}
          // fps={2}
          // pixelFormat="yuv"
          // frameProcessor={frameProcessor}
          isActive={active}
        />
      )}
      <View className="items-center justify-center flex-1">
        <View className="mb-4 h-20 aspect-[3/1] rounded-lg border-4 border-gray-500" />
        <Button
          onPress={() => setActive(p => !p)}
          title={active ? 'Desativar Camera' : 'Ativar Camera'}
        />
        {active && (
          <>
            <Button onPress={toggleCamera} title={'Trocar Camera'} />
            <Button onPress={takePhoto} title={'Tirer Photo'} />
          </>
        )}
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
