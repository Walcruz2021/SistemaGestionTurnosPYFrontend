// src/store/index.js

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk'; // Importar redux-thunk
import rootReducer from "../reducer"; // Ajusta la ruta según la estructura de tu proyecto

//here use library redux-persist for mantain state constant. in the moment refresh page the state will constant
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)) // Aplicar redux-thunk como middleware
);

const persistor = persistStore(store);

export { store, persistor };
