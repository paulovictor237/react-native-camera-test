import {View, Button} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteNames, Routes} from './routes';

type Props = NativeStackScreenProps<Routes, 'Home'>;

export function Home({navigation}: Props) {
  return (
    <View className="flex-1 p-6">
      {RouteNames.map(rota => (
        <View key={rota} className="mb-6">
          <Button title={rota} onPress={() => navigation.navigate(rota)} />
        </View>
      ))}
    </View>
  );
}
