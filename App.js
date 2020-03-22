import React from 'react';
import Main from "./components/MainComponent";
import { Text, View } from 'react-native';
import { Provider } from "react-redux";
import { configureStore } from "./redux/ConfigureStore";
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor ,store} = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <Main />
      </PersistGate>
    </Provider>
  );
}