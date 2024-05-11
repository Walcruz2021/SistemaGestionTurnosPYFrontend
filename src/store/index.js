// // STORE 14:06 min repaso martes
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// redux thuink sirve para trabajar con lñas llamadas asincronas
import {thunk} from 'redux-thunk'
import rootReducer from '../reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );//


