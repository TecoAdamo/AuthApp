import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";

type InputPasswordProps = {
  value: string; // Tipando value como string
  onChangeText: (text: string) => void; // onChangeText deve ser uma função que aceita uma string
};

export default function InputPassword({
  value,
  onChangeText,
}: InputPasswordProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value} // A propriedade value aqui será uma string
        onChangeText={onChangeText}
        placeholder="Password: "
        secureTextEntry={true}
        style={styles.textInput}
        placeholderTextColor="white"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    color: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    height: 56,
    width: 300,
    padding: 16,
    marginBottom: 16,
  },
});
