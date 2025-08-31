import React, { useState } from "react";
import { View } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import GameScreen from "./src/screens/GameScreen"; // esta será tu pantalla de cartas

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <GameScreen />
      )}
    </View>
  );
}
