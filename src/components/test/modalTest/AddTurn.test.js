import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalAddTurn from "../../Modal/ModalAddTurn"; // ajustá la ruta
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Swal from "sweetalert2";

const mockStore = configureStore([]);

describe("ModalAddTurn", () => {
  let store;

  jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
  }));

  beforeEach(() => {
    store = mockStore({
      companySelected: { _id: "123", category: "pelu" },
      allClients: [],
      categoryMedicine: false,
      typePerson: "Cliente",
    });
  });

  const renderModal = () =>
    render(
      <Provider store={store}>
        <ModalAddTurn stateAddTurn={true} setStateAddTurn={jest.fn()} />
      </Provider>
    );

  test("El campo Nota Turno no es obligatorio", () => {
    renderModal();

    // completar los campos obligatorios: fecha y hora
    const dateInput = screen.getByLabelText(/Fecha Turno/i);
    const timeInput = screen.getByLabelText(/Horario Turno/i);

    fireEvent.change(dateInput, { target: { value: "2099-12-31" } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });

    // el botón debería estar habilitado aunque Nota Turno esté vacío
    const button = screen.getByRole("button", { name: /Agregar Turno/i });
    expect(button).not.toBeDisabled();
  });

  test("Fecha y Hora son campos obligatorios", () => {
    renderModal();

    const dateInput = screen.getByLabelText(/Fecha Turno/i);
    const timeInput = screen.getByLabelText(/Horario Turno/i);
    const button = screen.getByRole("button", { name: /Agregar Turno/i });

    // Inicialmente, botón deshabilitado si falta fecha
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    fireEvent.change(dateInput, { target: { value: "" } });
    expect(button).toBeDisabled();

    // Inicialmente, botón deshabilitado si falta hora
    fireEvent.change(dateInput, { target: { value: "2099-12-31" } });
    fireEvent.change(timeInput, { target: { value: "" } });
    expect(button).toBeDisabled();

    // Botón habilitado si ambos campos están completos
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    expect(button).not.toBeDisabled();
  });

  test("El campo Nota Turno tiene maxlength de 120 caracteres", () => {
    renderModal();

    const notesInput = screen.getByLabelText(/Nota Turno/i);
    expect(notesInput).toHaveAttribute("maxlength", "120");
  });

  test("No permite agregar turno con fecha menor a la actual", () => {
    renderModal(); // tu función que renderiza ModalAddTurn

    const dateInput = screen.getByLabelText(/Fecha Turno/i);
    const timeInput = screen.getByLabelText(/Horario Turno/i);
    const button = screen.getByRole("button", { name: /Agregar Turno/i });

    // Fecha pasada (ejemplo: ayer)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const day = String(yesterday.getDate()).padStart(2, "0");
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const year = yesterday.getFullYear();
    const pastDate = `${year}-${month}-${day}`;

    fireEvent.change(dateInput, { target: { value: pastDate } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });

    fireEvent.click(button);

    // Verificamos que SweetAlert se llamó con mensaje de error
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: "Fecha Incorrecta",
    });
  });
});
