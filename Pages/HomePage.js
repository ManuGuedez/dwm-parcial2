import React, {u, useEffect, useState} from "react";
import { View, Platform, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { url } from "../App";
import useGetData from "../hooks/useGetData";
import { useIsFocused } from "@react-navigation/native";
import Card from "../Components/Card";

export default function HomePage({ navigation }) {
  const {getData, data, loading, error} = useGetData({url});
  const isFocused = useIsFocused();
  const [destinations, setDestinations] = useState(data);
  const [changedFavorites, setChangedFavorites] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (data) {
      data.sort((a, b) => b.favorites - a.favorites)
      setDestinations(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getData();
      data.sort((a, b) => b.favorites - a.favorites)
      setDestinations(data);
    }
  }, [changedFavorites]);

  const handleAddData = () => {
    navigation.navigate("AddData")
  }

  const handleChangeFavorites = () => {
    setChangedFavorites(!changedFavorites);
  };

  const platformTextStyles = () => {
    if (isIOS) {
      return [styles.text, styles.iosText];
    } else if (isAndroid) {
      return [styles.text, styles.androidText];
    }
    return styles.text
  }

  const platformAddMessage = () => {
    if (isIOS) {
      return "Crear Destino";
    } else if (isAndroid) {
      return "Agregar Destino";
    }
    return "Add destination"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinations</Text>
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {Array.isArray(destinations) &&
          destinations.map((destination) => <Card key={destination.id} info={destination} handleChangeFavorites={handleChangeFavorites}/>)}
      </ScrollView>
      <View style={[styles.buttonsContainer, isIOS ? {display: "row", flexDirection: "row-reverse"} : {}]}>
        <TouchableOpacity onPress={handleAddData}>
          <View style={[styles.button, isIOS ? styles.iosButton : isAndroid ? styles.button : styles.button]}>
            <Text style={platformTextStyles()}>{platformAddMessage()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "85%",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 60,
    marginTop: 10
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "blue",
    padding: 10,
    alignSelf: "flex-start"
  },
  text:{
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  scroll: {
    gap: 10,
    width: "85%",
  },
  scrollContent: {
    alignItems: "center"
  },
  iosButton: {
    backgroundColor: "lightgreen",
  },
  iosText:{
    color: "black"
  },
  androidText: {
    color: "#607ad1"
  }
});