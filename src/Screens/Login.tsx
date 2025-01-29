import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import InputEmail from "../components/EmailInput";
import InputPassword from "../components/PasswordInput";
import ButtonAdvanced from "../components/button";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha os campos para prosseguir.");
      return;
    }

    setLoading(true);

    console.log("Enviando dados para login:", { email, password });

    try {
      const response = await axios.post(
        "http://192.168.0.107:3000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Bem-vindo", `Olá, ${response.data.name}!`);
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
      <View style={styles.containerInputs}>
        <InputEmail value={email} onChangeText={setEmail} />
        <InputPassword value={password} onChangeText={setPassword} />
        <ButtonAdvanced tittle="L O G I N" onPress={handleLogin} />
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
    marginTop: "70%",
  },
});
