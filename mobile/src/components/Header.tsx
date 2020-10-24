import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation();

  function goBackToMainScreen() {
    navigation.navigate("Map");
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Ionicons name="md-arrow-back" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={goBackToMainScreen}>
          <Ionicons name="md-close" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafc",
    borderBottomWidth: 1,
    borderColor: "#dde3f0",
    paddingTop: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito_600SemiBold",
    color: "#8fa7b3",
    fontSize: 16,
  },
});
