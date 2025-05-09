import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ColorList from './screens/ColorList';
import ColorDetails from './screens/ColorDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Color List"
            options={{ title: 'Color List' }}
            component={ColorList}
          />
          <Stack.Screen
            name="Details"
            component={ColorDetails}
            options={{ title: 'Color Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
