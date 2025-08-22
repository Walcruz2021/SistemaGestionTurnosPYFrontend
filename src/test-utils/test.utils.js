// import React from "react"
// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store } from "../store/index"; // ajusta la ruta a tu store

// const customRender = (ui, options) =>
//   render(<Provider store={store}>{ui}</Provider>, options);

// export * from "@testing-library/react";
// export { customRender as render };

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store"; // Ajusta la ruta a tu store

// Mock global de Firebase para todos los tests
jest.mock("../api/configFirebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => callback(null)), // simula usuario no logueado
  },
  db: {},
  storage: {},
}));

// Render personalizado que incluye Redux
const customRender = (ui, options) =>
  render(<Provider store={store}>{ui}</Provider>, options);

// Re-exporta todo de @testing-library/react para no romper imports existentes
export * from "@testing-library/react";

// Exporta nuestro render personalizado
export { customRender as render };
