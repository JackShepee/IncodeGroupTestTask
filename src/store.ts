import {
  createSlice,
  configureStore,
  PayloadAction,
  createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const middleware = [
  createSerializableStateInvariantMiddleware({
    // Ignore these paths from the error check
    ignoredActions: ["favourites/addFavourite", "favourites/deleteFavourite"],
    ignoredPaths: ["isFavourite"],
  }),
];

export type FavouriteGender = "female" | "male" | "other";

export type RootState = ReturnType<typeof store.getState>;

const initialState = {
  favourites: {
    female: 0,
    male: 0,
    other: 0,
  },
  isFavourite: new Set<string>(),
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (
      state,
      action: PayloadAction<{ gender: FavouriteGender; name: string }>
    ) => {
      const { gender, name } = action.payload;
      const isFavourite = state.isFavourite.has(name);
      if (isFavourite) {
        state.favourites[gender] -= 1;
        state.isFavourite.delete(name);
      } else {
        state.favourites[gender] += 1;
        state.isFavourite.add(name);
      }
    },
    clearAllFavourites: (state) => {
      state.favourites = {
        female: 0,
        male: 0,
        other: 0,
      };
      state.isFavourite.clear();
    },
  },
});

export const { addFavourite, clearAllFavourites } = favouritesSlice.actions;

const store = configureStore({
  reducer: favouritesSlice.reducer,
  middleware,
});

export default store;
