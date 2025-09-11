import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import ModalEditClient from "../../Modal/ModalEditClient";
import { MyContext } from "./MyContext";
const mockStore = configureStore([]);

describe("ModalEditClient", () => {
  let store;
  const initialState = {
    isMedicine: false,
  };
  store = mockStore({
    isMedicine: false,
  });

  beforeEach(() => {
    store = mockStore({
      companySelected: { _id: "123", category: "pelu" },
      allClients: [{ _id: "1", name: "Cliente Test" }],
      categoryMedicine: false,
      typePerson: "Cliente",
    });
  });
  const renderModal = () =>
    render(
      <Provider store={store}>
        <ModalEditClient
          state={true}
          setState={jest.fn()}
          idClient="68b84e1c6c7a897adbe169b3"
          name="Pepe Argento"
          phone="387615799"
          address="Calle Falsa 123"
          notesCli="Cliente VIP"
          email="pepe.argento@example.com"
        />
      </Provider>
    );

  test("Campo Nombre y Apellido tiene maxLength de 25 caracteres", () => {
    renderModal();
    const nameCli = screen.getByLabelText("(*) Nombre y Apellido");
    expect(nameCli).toHaveAttribute("maxLength", "25");
  });

  test("Campo Celular debe aceptar solo numeros y con cantidad maxima de 15", () => {
    renderModal();
    const phoneInput = screen.getByLabelText("(*) Teléfono Contacto");
    // Simulamos escribir letras y números
    fireEvent.change(phoneInput, { target: { value: "abc123" } });

    // Esperamos que se guarden solo los números
    expect(phoneInput.value).toBe("123");

    fireEvent.change(phoneInput, { target: { value: "12345678901234567890" } });
    expect(phoneInput.value.length).toBeLessThanOrEqual(15);
  });

  test("Campo Domicilio tiene maxLength de 40 caracteres", () => {
    renderModal();
    const addressInput = screen.getByLabelText("(*) Domicilio");
    expect(addressInput).toHaveAttribute("maxLength", "40");
  });

  test("Campo Nota tiene maxLength de 120 caracteres", () => {
    renderModal();
    const noteInput = screen.getByLabelText(/Nota/i); // se utiliza una expresion regular que busque label Nota ya que ese atributo en el formulario es dinamico, puede decir nota cliente o nota paciente
    expect(noteInput).toHaveAttribute("maxLength", "120");
  });

  test("Campo Email tiene maxLength de 40 caracteres", () => {
    renderModal();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveAttribute("maxLength", "40");
    expect(emailInput).not.toBeRequired();
  });

  test("El botón Editar Cliente está habilitado al inicio si los campos vienen completos", () => {
    renderModal({
      name: "Juan Perez",
      phone: "123456789",
      address: "Calle Falsa 123",
    });

    const button = screen.getByRole("button", { name: /Modificar/i });
    expect(button).not.toBeDisabled();
  });

  test("El botón Editar Cliente se deshabilita si se borran los campos obligatorios", () => {
    renderModal({
      name: "Juan Perez",
      phone: "123456789",
      address: "Calle Falsa 123",
    });

    const button = screen.getByRole("button", { name: /Modificar/i });
    expect(button).not.toBeDisabled();

    const nameInput = screen.getByLabelText("(*) Nombre y Apellido");
    fireEvent.change(nameInput, { target: { value: "" } });

    expect(button).toBeDisabled();
  });
});
