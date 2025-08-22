import React from "react";
import { render, screen } from "./test-utils/test.utils.js";
//import { render, screen } from "../../test-utils/test-utils";

import config from "../src/api/configFirebase.js"
import App from "./App.js";

jest.mock("./api/configFirebase", () => ({
  auth: { onAuthStateChanged: jest.fn() },
  db: {},
  storage: {},
}));

test("App se renderiza sin errores", () => {
  render(<App />);
  expect(screen.getByText(/Espere un Momento por favor .../i)).toBeInTheDocument(); 
});