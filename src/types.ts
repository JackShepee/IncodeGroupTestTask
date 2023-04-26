export type RootStackParamList = {
  CharactersList: undefined;
  CharacterDetails: {
    character: {
      name: string;
      gender: string;
      birth_year: string;
      species?: string;
      homeworld?: string;
    };
  };
};
