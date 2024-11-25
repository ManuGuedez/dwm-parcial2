import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { url } from "../App";
import useGetData from "../hooks/useGetData";
import useDeleteData from "../hooks/useDeleteData";
import EditModal from "../Components/EditModal";

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const { data, loading, error } = useGetData({ url: url + "/" + id });
  const deleteData = useDeleteData(url);
  const [showEditModal, setShowEditModal] = useState(false);
  const [destination, setDestination] = useState(null);

  const handleDelete = async () => {
    const deleted = await deleteData(destination);
    if (deleted) {
      navigation.reset({
        index: 0, // Indica que el stack empieza en la HomePage
        routes: [{ name: "HomePage" }], // Define las páginas en el stack, así solo queda HomePage
      });
    } else {
      alert("Error al eliminar la información");
    }
  };

  useEffect(() => {
    setDestination(data);
  }, [data]);

  const handleUpdatedData = (updatedData) => {
    setDestination(updatedData);
    setShowEditModal(false);
  };

  const getLabelColor = () => {
    if (destination?.difficulty === "Difícil") {
      return [styles.tag, styles.dificil];
    } else if (destination?.difficulty === "Moderada") {
      return [styles.tag, styles.moderada];
    } else {
      // facil
      return [styles.tag, styles.facil];
    }
  };

  return (
    <View style={styles.contentContainer}>
      {loading && <ActivityIndicator size="small" color="black" />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      <Text style={[styles.text, { fontSize: 25 }]}>Details</Text>
      <Text style={styles.title}>{destination?.name}</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.generalInfoContainer}
      >
        <View>
          <Text style={[styles.generalInfoText, styles.label]}>
            Descripción
          </Text>
          <Text style={[styles.generalInfoText]}>
            {destination?.description}
          </Text>
        </View>
        <View>
          <Text style={[styles.generalInfoText, styles.label]}>Dificultad</Text>
          <View style={getLabelColor()}>
            <Text style={[styles.generalInfoText, {textAlign: "center"}]}>{destination?.difficulty}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <View style={[styles.button, styles.deleteButton]}>
            <Text style={styles.text}>delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEditModal(true)}>
          <View style={[styles.button, styles.editButton]}>
            <Text style={[styles.text, { color: "white" }]}>edit</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showEditModal && (
        <EditModal current_data={destination} onClose={handleUpdatedData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  generalInfoContainer: {
    width: 350,
    padding: 20,
    gap: 15,
  },
  generalInfoText: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 55,
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "white",
    width: 100,
    padding: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "lightpink",
  },
  editButton: {
    backgroundColor: "#607ad1",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tag: {
    width: 100,
    height: "ajust-content",
    padding: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  facil: {
    backgroundColor: "lightgreen",
  },
  moderada: {
    backgroundColor: "yellow",
  },
  dificil: {
    backgroundColor: "plum", // esto es violeta 
  },
});
