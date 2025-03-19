import AsyncStorage from "@react-native-async-storage/async-storage";

export const userAuthReducerPersistConfig = {
    key: 'athReducer',
    storage: AsyncStorage,
    blacklist: ['auth'],
  };


 
