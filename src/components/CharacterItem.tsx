import React, { FunctionComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface CharacterItemProps {
  character: {
    name: string;
    url: string;
    gender: string;
  };
  onPress: (event: GestureResponderEvent) => void;
  onAddToFavourites: (event: GestureResponderEvent) => void;
}

const CharacterItem: FunctionComponent<CharacterItemProps> = ({
  character,
  onPress,
  onAddToFavourites,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title}>{character.name}</Text>
      <TouchableOpacity onPress={onAddToFavourites}>
        <MaterialCommunityIcons name="heart" color={"black"} size={20} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
  },
  addToFavourites: {
    color: "blue",
  },
});

export default CharacterItem;
