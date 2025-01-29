import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";

import InputEmail from "../components/EmailInput";
import InputPassword from "../components/PasswordInput";
import ButtonAdvanced from "../components/button";
import InputName from "../components/InputSignUp";

import { useState } from "react";

import axios from "axios";
import Toast from "react-native-toast-message";

type PropsInfo = {
  name: string;
  email: string;
  password: string;
};

const handleSignUp = async (userData: PropsInfo) => {
  try {
    const response = await axios.post(
      "http://192.168.0.107:3000/user",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      Alert.alert("Cadastro concluído");
    } else {
      console.error("Resposta inesperada:", response);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Resposta inesperada do servidor.",
      });
    }
  } catch (error: any) {
    console.error("Erro na requisição:", error);

    if (error.response) {
      console.error("Resposta do erro:", error.response);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: error.response.data.message || "Erro ao cadastrar.",
      });
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "A requisição não foi respondida.",
      });
    } else {
      console.error("Erro desconhecido:", error.message);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível conectar ao servidor.",
      });
    }
  }
};

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    if (name === "" || email === "" || password === "") {
      Alert.alert("Preencha todos os campos.");
    } else {
      const userData: PropsInfo = {
        name,
        email,
        password,
      };
      handleSignUp(userData);
    }
  };

  return (
    <View style={styles.container}>
      <InputName value={name} onChangeText={setName} />
      <InputEmail value={email} onChangeText={setEmail} />
      <InputPassword value={password} onChangeText={setPassword} />
      <ButtonAdvanced tittle="S I G N  U P" onPress={handleSubmit} />
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
});
