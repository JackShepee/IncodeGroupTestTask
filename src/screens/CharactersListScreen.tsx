import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import axios from "axios";
import CharacterItem from "../components/CharacterItem";
import { addFavourite, clearAllFavourites, RootState } from "../store";
import { RootStackParamList } from "../types";

type Character = {
  name: string;
  url: string;
  gender: string;
  birth_year: string;
  homeworld?: string;
  species?: string;
};

const CharactersListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const favourites = useSelector((state: RootState) => state.favourites);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://swapi.dev/api/people/")
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleCharacterPress = (character: Character) => {
    navigation.navigate("CharacterDetails", { character });
  };

  const handleAddToFavourites = (gender: string) => {
    dispatch(addFavourite({ gender }));
  };

  const handleClearAllFavourites = () => {
    dispatch(clearAllFavourites());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Favourites: Female: {favourites.female}, Male: {favourites.male}, Other:{" "}
        {favourites.other}
      </Text>
      <TouchableOpacity
        onPress={handleClearAllFavourites}
        style={styles.clearButton}
      >
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <CharacterItem
              character={item}
              onPress={() => handleCharacterPress(item)}
              onAddToFavourites={() => handleAddToFavourites(item.gender)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  counter: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 10,
  },
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CharactersListScreen;
