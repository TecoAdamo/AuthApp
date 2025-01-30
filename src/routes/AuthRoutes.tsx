import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { ImageProps } from "react-native";

import SignUp from "../Screens/SignUp";
import Login from "../Screens/Login";
import Home from "../Screens/Home";

type AuthRoutes = {
  signUp: undefined;
  login: undefined;
  home: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signUp" component={SignUp} />
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
