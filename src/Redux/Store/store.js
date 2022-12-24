import { createStore, applyMiddleware } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import regReducer from "../Reducer/reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // blacklist: ['Status'],
};

const reducers = combineReducers({
  regReducer: persistReducer(persistConfig, regReducer),
});

// cart: cartSlice,

export const store = createStore(reducers);

export const persistor = persistStore(store);
export default store;
