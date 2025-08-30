import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ onStart }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lotería Mexicana</Text>
      <Button title="Iniciar juego" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 40, fontWeight: "bold", marginBottom: 20 },
});
