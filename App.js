import React, { useState } from "react";
import { View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {!started ? (
        <HomeScreen onStart={() => setStarted(true)} />
      ) : (
        // Aquí luego pondremos la pantalla del juego
        <HomeScreen onStart={() => {}} />
      )}
    </View>
  );
}
