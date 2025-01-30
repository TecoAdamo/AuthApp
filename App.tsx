import React, { useEffect, useState } from "react";
import { Routes } from "./src/routes";

import { StatusBar, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(loggedInStatus === "true");
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    ); // Exibe um carregamento enquanto verifica
  }
  return (
    <>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
