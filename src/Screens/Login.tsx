import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import InputEmail from "../components/EmailInput";
import InputPassword from "../components/PasswordInput";
import ButtonAdvanced from "../components/button";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/AuthRoutes";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha os campos para prosseguir.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.0.105:3000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const userName = response.data.name;
        await AsyncStorage.setItem("userName", userName);
        await AsyncStorage.setItem("isLoggedIn", "true");
        navigation.navigate("home");
        setEmail("");
        setPassword("");
      } else {
        Alert.alert("Erro", "Resposta inesperada do servidor.");
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert(
          "Erro",
          error.response.data.message || "Erro ao fazer login."
        );
      } else if (error.request) {
        Alert.alert("Erro", "A requisição não foi respondida.");
      } else {
        Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={32}
        color="white"
        style={styles.icon}
        onPress={() => navigation.navigate("signUp")}
      />
      <View style={styles.containerInputs}>
        <InputEmail value={email} onChangeText={setEmail} />
        <InputPassword value={password} onChangeText={setPassword} />
        <View style={styles.containerBtn}>
          <ButtonAdvanced tittle="L O G I N" onPress={handleLogin} />
        </View>
      </View>
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
  containerInputs: {
    marginTop: "50%",
  },
  containerBtn: {
    marginBottom: 18,
    marginTop: "50%",
  },
  icon: {
    position: "absolute", // Faz com que o ícone fique fixo na parte superior
    top: 20, // Alinha o ícone 20 unidades abaixo da parte superior
    left: 20, // Alinha o ícone 20 unidades da borda esquerda
    marginTop: 30,
  },
});
