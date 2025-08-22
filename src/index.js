// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// // import reportWebVitals from './reportWebVitals';
// // import {Provider} from 'react-redux'
// // import {store} from "./store"

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
//  serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store,persistor } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from 'redux-persist/integration/react';
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    {/* PersistGate is config for use redux-persist*/}
    <PersistGate loading={null} persistor={persistor}>
        <ModalAddTurn onClick={mockFn} />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
