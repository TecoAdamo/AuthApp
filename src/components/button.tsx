import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

type Props = {
  tittle: string;
  onPress: () => void;
};

export default function ButtonAdvanced({ tittle, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.textBtn} {...rest}>
          {tittle}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    color: "white",
    borderWidth: 1,
    backgroundColor: "#B5BD00",
    borderColor: "#B5BD00",
    borderRadius: 8,
    height: 60,
    width: 300,
    padding: 16,
    marginTop: "50%",
  },
  textBtn: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "800",
  },
});
