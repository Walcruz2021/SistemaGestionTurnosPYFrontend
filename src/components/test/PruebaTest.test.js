import React from "react";
import { render, screen } from "@testing-library/react";
import PruebaTest from "../PruebaTest";

test("renderiza el texto EL TEST FUNCIONA", () => {
  render(<PruebaTest />);
  expect(screen.getByText(/EL TEST FUNCIONA/i)).toBeInTheDocument();
});