import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {View, Text} from 'react-native';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Routes} from './routes';

type Props = NativeStackScreenProps<Routes, 'PermissionsPage'>;

export function PermissionsPage({navigation}: Props): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...');
    const permission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setMicrophonePermissionStatus(permission);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (
      cameraPermissionStatus === 'granted' &&
      microphonePermissionStatus === 'granted'
    )
      navigation.replace('Home');
  }, [cameraPermissionStatus, microphonePermissionStatus, navigation]);

  return (
    <View>
      <Text>Welcome to{'\n'}Vision Camera.</Text>
      <View>
        {cameraPermissionStatus !== 'granted' && (
          <Text>
            Vision Camera needs <Text>Camera permission</Text>.{' '}
            <Text onPress={requestCameraPermission}>Grant</Text>
          </Text>
        )}
        {microphonePermissionStatus !== 'granted' && (
          <Text>
            Vision Camera needs <Text>Microphone permission</Text>.{' '}
            <Text onPress={requestMicrophonePermission}>Grant</Text>
          </Text>
        )}
      </View>
    </View>
  );
}
