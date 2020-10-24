import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Map from "./screens/Map";
import OrphanageDetails from "./screens/OrphanageDetails";
import OrphanageData from "./screens/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./screens/CreateOrphanage/SelectMapPosition";
import Header from "./components/Header";

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orphanage" />,
          }}
        />
        <Stack.Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Select in the map" />,
          }}
        />
        <Stack.Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Orphanage registre data" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
