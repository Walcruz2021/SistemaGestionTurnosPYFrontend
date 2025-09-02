import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalAdherirFicha from "../../Modal/ModalAddFicha"; // ajustá la ruta
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Swal from "sweetalert2";

const mockStore = configureStore([]);

describe("ModalAdherirFicha", () => {
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
        <ModalAdherirFicha
          openState={true}
          setOpenState={jest.fn()}
          stateNewFicha={jest.fn()}
          setStateNewFicha={jest.fn()}
        />
      </Provider>
    );

  test("El campo Receta tiene maxlength de 100 caracteres", () => {
    renderModal();
    // screen.debug(); // <-- Esto imprime el DOM renderizado en la consola del test
    const recetaInput = screen.getByLabelText(/Receta Otorgada/i);
    expect(recetaInput).toHaveAttribute("maxlength", "100");
  });

  test("El campo Vacuna tiene maxlength de 100 caracteres", () => {
    renderModal();

    const vacunaInput = screen.getByLabelText(/Vacunas/i);
    expect(vacunaInput).toHaveAttribute("maxlength", "100");
  });

  test("El campo Tratamiento tiene maxlength de 100 caracteres", () => {
    renderModal();

    const tratamientoInput = screen.getByLabelText(/Tratamiento/i);
    expect(tratamientoInput).toHaveAttribute("maxlength", "100");
  });

  test("Campo Peso tiene maxlength de 3 caracteres y debe aceptar solo numeros", () => {
    renderModal();

    const pesoInput = screen.getByLabelText(/Peso/i);

    // Simulamos escribir letras y números
    fireEvent.change(pesoInput, { target: { value: "12dsf3" } });

    // Esperamos que se guarden solo los números
    expect(pesoInput.value).toBe("123");

    //ingresamos mas de 3 caracteres
    fireEvent.change(pesoInput, { target: { value: "123687687684" } });
    expect(pesoInput.value.length).toBeLessThanOrEqual(3);
  });
});
