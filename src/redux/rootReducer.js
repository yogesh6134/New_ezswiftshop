// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slice/loadingSlice';
import AuthReducer from './slice/onBoardingSlice';
import ProductReducer from './slice/ProductReducer'

import {
  userAuthReducerPersistConfig,
} from '../utils/persistData';
import { persistReducer } from 'redux-persist';


const appReducer = combineReducers({
  loading: loadingReducer,
  AuthReducer: persistReducer(userAuthReducerPersistConfig, AuthReducer),
  // ProfileReducer:  persistReducer(userProfileReducerPersistConfig, ProfileReducer),
  ProductReducer,
  // PartnerDetailReducer,

  // AddPropertyReducer: persistReducer(userPropertyReducerPersistConfig, AddPropertyReducer),

});

const rootReducer = (state, action) => {
  // if (action.type === RESET_STATE) {
  //   state = undefined; // Reset the entire state
  // }
  return appReducer(state, action);
};

export default rootReducer; 
