import { StyleSheet } from "react-native";
import React from "react";
import Home from "./views/Home";
import Movie from "./views/Movie";
import { createStackNavigator } from "@react-navigation/stack";
import Episodes from "./views/Episodes";
import { Episode } from "./model/Episode";

export type StackRoutes = {
  Home: undefined;
  Movie: { id: number };
  Episodes: { episodes: Episode[]; name: string };
};
const Stack = createStackNavigator<StackRoutes>();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerTitle: "Movie Finder" }}
        component={Home}
      ></Stack.Screen>
      <Stack.Screen name="Movie" component={Movie}></Stack.Screen>
      <Stack.Screen name="Episodes" component={Episodes}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
