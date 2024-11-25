import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { url } from "../App";
import useEditData from "../hooks/useEditData";
import DropdownComponent from "./Dropdown";

const EditModal = ({ onClose, current_data }) => {
  const editData = useEditData(url);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    setUpdatedData(current_data); // ver si tene alguna cosa que se deba castear o algo así
  }, []);

  const handleChange = (key, value) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditData = async () => {
    const edited = await editData(updatedData);
    if (edited) {
      onClose(edited);
    } else {
      alert("Error al editar la información");
    }
  };

  const handleSelectedDifficulty = (difficulty) => {
    handleChange("difficulty", difficulty);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose(current_data)}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPressOut={() => onClose(current_data)}
        />
        <View style={styles.modalContent}>
          <Text style={styles.title}>Editar Destino</Text>
          <View />
          <Text style={styles.text}>Nombre: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Nombre del destino..."
            value={updatedData.name}
          />
          <Text style={styles.text}>Description: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("description", value)}
            placeholder="Descripción..."
            value={updatedData.description}
          />
          <Text style={styles.text}>Dificultad: </Text>
          <DropdownComponent
            handleSelectedDifficulty={handleSelectedDifficulty}
          />
          <View>
            <TouchableOpacity style={styles.button} onPress={handleEditData}>
              <Text style={styles.submitButtonText}>Confirmar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fdf0e6",
    borderRadius: 10,
    overflow: "hidden",
    height: "ajust-content",
    alignItems: "center",
    padding: 30,
    gap: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  submitButtonText: {
    color: "blsck",
    fontSize: 16,
    textAlign: "center",
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
    backgroundColor: "#ff9f67",
    padding: 15,
    marginTop: 20,
  },
});

export default EditModal;
