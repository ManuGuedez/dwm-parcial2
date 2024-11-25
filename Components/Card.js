import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useEditData from "../hooks/useEditData";
import { url } from "../App";

export default function Card({ info, handleChangeFavorites }) {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(info.favorites);
  const editData = useEditData(url);

  const handleGoDetails = () => {
    const id = info.id;
    console.log("id: ", id);
    navigation.navigate("Details", { id });
  };

  const getLabelColor = () => {
    if (info.difficulty === "Difícil") {
      return [styles.label, styles.dificil];
    } else if (info.difficulty === "Moderada") {
      return [styles.label, styles.moderada];
    } else {
      // facil
      return [styles.label, styles.facil];
    }
  };

  const handleAddFavorite = () => {
    const update = { ...info, favorites: info.favorites + 1 };
    const edited = editData(update);
    if (edited) {
      setFavorites(favorites + 1);
      console.log("Se actualizó correctamente");
      handleChangeFavorites();
    }
  };

  const handleRemoveFavorite = () => {
    const update = { ...info, favorites: info.favorites - 1 };
    const edited = editData(update);
    if (edited) {
      setFavorites(favorites - 1);
      console.log("Se actualizó correctamente");
      handleChangeFavorites();
    }
  };

  return (
    <View style={[styles.cardContainer, styles.smallCardContianer]}>
      <TouchableOpacity onPress={handleGoDetails} style={{width: "100%"}}>
        <View style={getLabelColor()}></View>
        <View>
          <Text style={styles.title}>{info.name}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.favorite}>
        <TouchableOpacity onPress={handleRemoveFavorite}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <Text style={styles.favoriteText}>⭐ {favorites}</Text>
        <TouchableOpacity onPress={handleAddFavorite}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "skyblue",
    borderRadius: 15,
    padding: 10,
    gap: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#c2cffa",
    borderRadius: 100,
    padding: 8,
    width: 35,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  smallCardContianer: {
    width: 220,
    height: "ajust-content",
    paddingTop: 10,
    paddingBottom: 20,
  },
  label: {
    width: 80,
    height: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  facil: {
    backgroundColor: "green",
  },
  moderada: {
    backgroundColor: "yellow",
  },
  dificil: {
    backgroundColor: "darkviolet",
  },
  favorite: {
    width: "ajust-content",
    height: "ajust-content",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  favoriteText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
