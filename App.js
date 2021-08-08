import React from "react";
import { StyleSheet } from "react-native";
import Stack from "./navigation/Stack";
import { Provider } from "react-redux";
import { reducer } from "./redux/store";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userSignInReducer"],
};

const persitedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persitedReducer,
  applyMiddleware(thunk)
);

const persistedStore = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Stack />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
