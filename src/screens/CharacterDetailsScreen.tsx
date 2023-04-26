import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";

const CharacterDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "CharacterDetails">>();
  const [characterSpecies, setCharacterSpecies] = useState<String>();
  const [characterHomeWorld, setCharacterHomeWorld] = useState<String>();
  const { character } = route.params;

  useEffect(() => {
    const fetchSpecies = async () => {
      if (character.species && character.species.length > 0) {
        const response = await axios.get(character.species[0]);
        setCharacterSpecies(response.data.name);
      } else {
        setCharacterSpecies("Unknown");
      }
    };

    const fetchHomeWorld = async () => {
      if (character.homeworld) {
        const response = await axios.get(character.homeworld);
        setCharacterHomeWorld(response.data.name);
      } else {
        setCharacterHomeWorld("Unknown");
      }
    };

    fetchSpecies();
    fetchHomeWorld();
  }, [character.species, character.homeworld]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{character.name}</Text>
      <Text style={styles.info}>Gender: {character.gender}</Text>
      <Text style={styles.info}>Birth Year: {character.birth_year}</Text>
      <Text style={styles.info}>Species: {characterSpecies}</Text>
      <Text style={styles.info}>Home World: {characterHomeWorld}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CharacterDetailsScreen;
