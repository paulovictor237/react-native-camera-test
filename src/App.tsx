import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './routes';
import {CameraPeve} from './CameraPeve';
import {Home} from './Home';
import {PermissionsPage} from './PermissionsPage';

const Stack = createNativeStackNavigator<Routes>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
        <Stack.Screen name="CameraPeve" component={CameraPeve} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
