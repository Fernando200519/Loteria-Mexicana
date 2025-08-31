import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // Después de 3 segundos pasamos a la siguiente pantalla
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="bounceIn"
        iterationCount={1}
        style={styles.title}
      >
        Lotería Mexicana
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#333" },
});
