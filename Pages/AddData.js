import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { url } from "../App";
import usePostData from "../hooks/usePostData";
import DropdownComponent from "../Components/Dropdown";

export default function AddData({ navigation }) {
  const [newDestination, setNewDestination] = useState({
    // ver como es la estructura de la infromación
    name: "",
    description: "",
    difficulty: "",
    favorites: 0, // por defecto empieza en 0
  });
  const postData = usePostData({ url });

  const handleChange = (key, value) => {
    setNewDestination((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateDestination = () => {
    if (
      !newDestination.name.trim() ||
      !newDestination.description.trim() ||
      !newDestination.difficulty.trim()
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }
    const posted = postData(newDestination);
    if (posted) {
      navigation.reset({
        index: 0, // Indica que el stack comenzará en la página Home
        routes: [{ name: "HomePage" }], // Define las páginas en el stack; aquí solo queda Home
      });
    }
  };

  const data = [
    { label: "Difícil", value: "Difícil" },
    { label: "Moderada", value: "Moderada" },
    { label: "Fácil", value: "Fácil" },
  ];

  const handleSelectedDifficulty = (difficulty) => {
    handleChange("difficulty", difficulty);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nuevo destino</Text>
        <Text style={styles.text}>Nombre del destino: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Nombre del destino..."
          value={newDestination.name}
        />
        <Text style={styles.text}>Descripción: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("description", value)}
          placeholder="Descripción..."
          // multiline
          value={newDestination.description}
        />
        <Text style={styles.text}>Dificultad: </Text>
        {/* <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("difficulty", value)}
          placeholder="Dificultad..."
          // multiline
          value={newDestination.difficulty}
        /> */}
        {/* drop-down */}
        <DropdownComponent
          handleSelectedDifficulty={handleSelectedDifficulty}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleCreateDestination}>
          <View style={[styles.button]}>
            <Text style={[styles.text, { textAlign: "center" }]}>
              Crear destino
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf0e6",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 80,
  },
  content: {
    gap: 10,
    flex: 1,
    backgroundColor: "#fdf0e6",
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "white",
    padding: 10,
  },
  text: {
    alignSelf: "flex-start",
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    gap: 10,
  },
  inputArea: {
    backgroundColor: "pink",
    borderColor: "red",
    width: 290,
    height: 40,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "pink",
    padding: 10,
  },
});
