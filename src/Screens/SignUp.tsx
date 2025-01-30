import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";

import InputEmail from "../components/EmailInput";
import InputPassword from "../components/PasswordInput";
import ButtonAdvanced from "../components/button";
import InputName from "../components/InputSignUp";

import { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/AuthRoutes";

type PropsInfo = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleSignUp = async (userData: PropsInfo) => {
    try {
      console.log("Enviando dados para o backend...", userData); // Debug

      const response = await axios.post(
        "http://192.168.0.105:3000/user",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do servidor:", response.data); // Debug

      if (response.status === 201) {
        Alert.alert("Cadastro concluído", "Agora você pode fazer login.", [
          { text: "OK", onPress: () => navigation.navigate("login") },
        ]);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Resposta inesperada do servidor.",
        });
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error); // Debug

      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: error.response.data.message || "Erro ao cadastrar.",
        });
      } else if (error.request) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "A requisição não foi respondida.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível conectar ao servidor.",
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Erro", "Preencha todos os campos antes de continuar.");
      return;
    }

    const userData: PropsInfo = { name, email, password };
    handleSignUp(userData); // Chama a função corretamente
  };

  const goLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <InputName value={name} onChangeText={setName} />
      <InputEmail value={email} onChangeText={setEmail} />
      <InputPassword value={password} onChangeText={setPassword} />
      <View style={styles.containerBtn}>
        <ButtonAdvanced tittle="S I G N  U P" onPress={handleSubmit} />
      </View>
      <ButtonAdvanced tittle="L O G I N" onPress={goLogin} />
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
  containerBtn: {
    marginBottom: 18,
    marginTop: "30%",
  },
});
