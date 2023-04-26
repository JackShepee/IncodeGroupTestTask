import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "./screens/CharactersListScreen";
import CharacterDetailsScreen from "./screens/CharacterDetailsScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharactersList">
        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
