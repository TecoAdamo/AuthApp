import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/AuthRoutes";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  useEffect(() => {
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      }
    };

    loadUserName();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userName"); // Remove o nome do usuário
    await AsyncStorage.removeItem("isLoggedIn"); // Remove a flag de login
    navigation.navigate("login"); // Redireciona para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, {userName || "Usuário"}!</Text>
      <Button title="Sair" onPress={handleLogout} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13294B",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
