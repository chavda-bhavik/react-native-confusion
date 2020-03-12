import React from 'react';
import Main from "./components/MainComponent";
import { Text, View } from 'react-native';
import { Provider } from "react-redux";
import { configureStore } from "./redux/ConfigureStore";
const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}