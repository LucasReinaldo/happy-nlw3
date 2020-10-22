import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Map from './screens/Map';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;