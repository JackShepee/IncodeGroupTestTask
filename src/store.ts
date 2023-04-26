import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

export type FavouriteGender = "female" | "male" | "other";

export type RootState = ReturnType<typeof store.getState>;

const initialState = {
  favourites: {
    female: 0,
    male: 0,
    other: 0,
  },
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<{ gender: string }>) => {
      const gender = action.payload.gender;
      if (gender === "female") {
        state.favourites.female += 1;
      } else if (gender === "male") {
        state.favourites.male += 1;
      } else {
        state.favourites.other += 1;
      }
    },
    clearAllFavourites: (state) => {
      state.favourites = {
        female: 0,
        male: 0,
        other: 0,
      };
    },
  },
});

export const { addFavourite, clearAllFavourites } = favouritesSlice.actions;

const store = configureStore({
  reducer: favouritesSlice.reducer,
});

export default store;
