import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { shuffleArray } from "../utils/shuffle";

const images = {
  "1 el gallo-min.jpg": require("../../assets/cards/1 el gallo-min.jpg"),
  "2 el diablito-min.jpg": require("../../assets/cards/2 el diablito-min.jpg"),
  "3 la dama-min.jpg": require("../../assets/cards/3 la dama-min.jpg"),
  "4 el catrin-min.jpg": require("../../assets/cards/4 el catrin-min.jpg"),
  "5 el paraguas-min.jpg": require("../../assets/cards/5 el paraguas-min.jpg"),
  "6 la sirena-min.jpg": require("../../assets/cards/6 la sirena-min.jpg"),
  "7 la escalera-min.jpg": require("../../assets/cards/7 la escalera-min.jpg"),
  "8 la botella-min.jpg": require("../../assets/cards/8 la botella-min.jpg"),
  "9 el barril-min.jpg": require("../../assets/cards/9 el barril-min.jpg"),
  "10 el arbol-min.jpg": require("../../assets/cards/10 el arbol-min.jpg"),
  "11 el melon-min.jpg": require("../../assets/cards/11 el melon-min.jpg"),
  "12 el valiente-min.jpg": require("../../assets/cards/12 el valiente-min.jpg"),
  "13 el gorrito-min.jpg": require("../../assets/cards/13 el gorrito-min.jpg"),
  "14 la muerte-min.jpg": require("../../assets/cards/14 la muerte-min.jpg"),
  "15 la pera-min.jpg": require("../../assets/cards/15 la pera-min.jpg"),
  "16 la bandera-min.jpg": require("../../assets/cards/16 la bandera-min.jpg"),
  "17 el bandolon-min.jpg": require("../../assets/cards/17 el bandolon-min.jpg"),
  "18 el violoncello-min.jpg": require("../../assets/cards/18 el violoncello-min.jpg"),
  "19 la garza-min.jpg": require("../../assets/cards/19 la garza-min.jpg"),
  "20 el pajaro-min.jpg": require("../../assets/cards/20 el pajaro-min.jpg"),
  "21 la mano-min.jpg": require("../../assets/cards/21 la mano-min.jpg"),
  "22 la bota-min.jpg": require("../../assets/cards/22 la bota-min.jpg"),
  "23 la luna-min.jpg": require("../../assets/cards/23 la luna-min.jpg"),
  "24 el cotorro-min.jpg": require("../../assets/cards/24 el cotorro-min.jpg"),
  "25 el borracho-min.jpg": require("../../assets/cards/25 el borracho-min.jpg"),
  "26 el negrito-min.jpg": require("../../assets/cards/26 el negrito-min.jpg"),
  "27 el corazon-min.jpg": require("../../assets/cards/27 el corazon-min.jpg"),
  "28 la sandia-min.jpg": require("../../assets/cards/28 la sandia-min.jpg"),
  "29 el tambor-min.jpg": require("../../assets/cards/29 el tambor-min.jpg"),
  "30 el camaron-min.jpg": require("../../assets/cards/30 el camaron-min.jpg"),
  "31 las jaras-min.jpg": require("../../assets/cards/31 las jaras-min.jpg"),
  "32 el musico-min.jpg": require("../../assets/cards/32 el musico-min.jpg"),
  "33 la arana-min.jpg": require("../../assets/cards/33 la arana-min.jpg"),
  "34 el soldado-min.jpg": require("../../assets/cards/34 el soldado-min.jpg"),
  "35 la estrella-min.jpg": require("../../assets/cards/35 la estrella-min.jpg"),
  "36 el cazo-min.jpg": require("../../assets/cards/36 el cazo-min.jpg"),
  "37 el mundo-min.jpg": require("../../assets/cards/37 el mundo-min.jpg"),
  "38 el apache-min.jpg": require("../../assets/cards/38 el apache-min.jpg"),
  "39 el nopal-min.jpg": require("../../assets/cards/39 el nopal-min.jpg"),
  "40 el alacran-min.jpg": require("../../assets/cards/40 el alacran-min.jpg"),
  "41 la rosa-min.jpg": require("../../assets/cards/41 la rosa-min.jpg"),
  "42 la calavera-min.jpg": require("../../assets/cards/42 la calavera-min.jpg"),
  "43 la campana-min.jpg": require("../../assets/cards/43 la campana-min.jpg"),
  "44 el cantarito-min.jpg": require("../../assets/cards/44 el cantarito-min.jpg"),
  "45 el venado-min.jpg": require("../../assets/cards/45 el venado-min.jpg"),
  "46 el sol-min.jpg": require("../../assets/cards/46 el sol-min.jpg"),
  "47 la corona-min.jpg": require("../../assets/cards/47 la corona-min.jpg"),
  "48 la chalupa-min.jpg": require("../../assets/cards/48 la chalupa-min.jpg"),
  "49 el pino-min.jpg": require("../../assets/cards/49 el pino-min.jpg"),
  "50 el pescado-min.jpg": require("../../assets/cards/50 el pescado-min.jpg"),
  "51 la palma-min.jpg": require("../../assets/cards/51 la palma-min.jpg"),
  "52 la maceta-min.jpg": require("../../assets/cards/52 la maceta-min.jpg"),
  "53 el arpa-min.jpg": require("../../assets/cards/53 el arpa-min.jpg"),
  "54 la rana-min.jpg": require("../../assets/cards/54 la rana-min.jpg"),
};

const cartas = Object.entries(images).map(([fileName, image], index) => ({
  id: index + 1,
  name: fileName
    .replace(/^\d+\s/, "") // elimina numero y espacio
    .replace("-min.jpg", ""), // elimina sufijo
  image,
}));

export default function GameScreen() {
  const [deck, setDeck] = useState(shuffleArray(cartas));
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const intervalRef = useRef(null);

  // Inicia el juego
  const startGame = () => {
    setIsPlaying(true);
    setHistory([deck[0]]);
  };

  // Control del autoplay cada 5s
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextCard();
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, index]);

  const nextCard = () => {
    if (index < deck.length - 1) {
      setIndex((prev) => prev + 1);
      setHistory((prev) => [...prev, deck[index + 1]]);
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {/* Carta actual */}
      <TouchableOpacity onPress={() => setShowHistory(true)}>
        <Image
          source={deck[index].image}
          style={[styles.carta, !isPlaying && index === 0 ? styles.blur : null]}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{deck[index].name}</Text>

      {/* Boton de iniciar encima del Gallo difuminado */}
      {!isPlaying && index === 0 && (
        <View style={styles.overlay}>
          <Button title="Iniciar" onPress={startGame} />
        </View>
      )}

      {/* Controles */}
      {isPlaying && (
        <View style={styles.controls}>
          <Button title="⏮️ Retroceder" onPress={prevCard} />
          <Button
            title={isPlaying ? "⏸️ Pausar" : "▶️ Reanudar"}
            onPress={togglePlay}
          />
          <Button title="⏭️ Adelantar" onPress={nextCard} />
        </View>
      )}

      {/* Modal del historial */}
      <Modal visible={showHistory} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Historial de cartas</Text>
          {history.map((carta, i) => (
            <Text key={i}>{carta.name}</Text>
          ))}
          <Button title="Cerrar" onPress={() => setShowHistory(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  carta: { width: 200, height: 300, resizeMode: "contain" },
  name: { fontSize: 20, marginTop: 10 },
  blur: { opacity: 0.5 },
  overlay: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    width: "90%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
