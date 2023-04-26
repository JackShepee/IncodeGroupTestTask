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
import {
  addFavourite,
  clearAllFavourites,
  RootState,
  FavouriteGender,
} from "../store";
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
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const favourites = useSelector((state: RootState) => state.favourites);
  const isFavourite = useSelector((state: RootState) => state.isFavourite);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchCharacters("https://swapi.dev/api/people/");
  }, []);

  const fetchCharacters = (url: string) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setCharacters(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  };

  const handleCharacterPress = (character: Character) => {
    navigation.navigate("CharacterDetails", { character });
  };

  const handleToggleFavourite = (gender: string, name: string) => {
    const genderMapping: { [key: string]: FavouriteGender } = {
      female: "female",
      male: "male",
      n_a: "other",
      none: "other",
    };

    const mappedGender = genderMapping[gender.replace("/", "_")] || "other";
    dispatch(addFavourite({ gender: mappedGender, name }));
  };

  const handleClearAllFavourites = () => {
    dispatch(clearAllFavourites());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Female: {favourites.female} | Male: {favourites.male} | Other:{" "}
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
              onToggleFavourites={() =>
                handleToggleFavourite(item.gender as FavouriteGender, item.name)
              }
              isFavourite={isFavourite.has(item.name)}
            />
          )}
        />
      )}
      <View style={styles.paginationButtons}>
        <TouchableOpacity
          onPress={handlePrevPage}
          style={styles.paginationButton}
        >
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPage}
          style={styles.paginationButton}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#222",
  },
  counter: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 10,
    color: "#fff",
  },
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  paginationButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  paginationButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CharactersListScreen;
