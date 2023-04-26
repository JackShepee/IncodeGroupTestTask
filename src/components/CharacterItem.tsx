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
  onToggleFavourites: (event: GestureResponderEvent) => void;
  isFavourite: boolean;
}

const CharacterItem: FunctionComponent<CharacterItemProps> = ({
  character,
  onPress,
  onToggleFavourites,
  isFavourite,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title}>{character.name}</Text>
      <TouchableOpacity onPress={onToggleFavourites}>
        <MaterialCommunityIcons
          name="heart"
          color={isFavourite ? "red" : "#44AEEA"}
          size={48}
        />
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
    color: "#fff",
  },
});

export default CharacterItem;
