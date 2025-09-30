import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import FormRegister from "../../Formulario/FormsRegister";
import { MemoryRouter } from "react-router-dom";
const mockStore = configureStore([]);

describe("FormRegister", () => {
  let store;
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
        <MemoryRouter>
          <FormRegister />
        </MemoryRouter>
      </Provider>
    );

  test("El campo Nombre tiene minimo de 2 caracteres y un maximo de 20 caracteres", () => {
    renderModal();
    const inputName = screen.getByLabelText("(*) Nombre");
    expect(inputName).toHaveAttribute("minLength", "2");
    expect(inputName).toHaveAttribute("maxLength", "20");
  });

  test("El campo Apellido tiene un minimo de 2 caracteres y un maximo de 20 caracteres", () => {
    renderModal();
    const inputLastName = screen.getByLabelText("(*) Apellido");
    expect(inputLastName).toHaveAttribute("minLength", "2");
    expect(inputLastName).toHaveAttribute("maxLength", "20");
  });

  test("El campo Contraseña tiene un minimo de 6 caracteres y un maximo de 20 caracteres", () => {
    renderModal();
    const passInput = screen.getByPlaceholderText("Password mayor 5 digitos");
    expect(passInput).toHaveAttribute("minLength", "6");
    expect(passInput).toHaveAttribute("maxLength", "20");
  });

    test("El campo 2 Contraseña tiene un minimo de 6 caracteres y un maximo de 20 caracteres", () => {
    renderModal();
    const passInput = screen.getByPlaceholderText("Ingrese de nuevo el password");
    expect(passInput).toHaveAttribute("minLength", "6");
    expect(passInput).toHaveAttribute("maxLength", "20");
  });

  test("El botón Registrarse se habilita solo si los campos obligatorios están completos y cumplen con todos los requisitos", async () => {
    renderModal();

    // Obtén los campos obligatorios
    const nameInput = screen.getByLabelText("(*) Nombre");
    const lastNameInput = screen.getByLabelText("(*) Apellido");
    const emailInput = screen.getByPlaceholderText("Ingrese su Email");
    const passInput = screen.getByPlaceholderText("Password mayor 5 digitos");
    const passConfirmInput = screen.getByPlaceholderText(
      "Ingrese de nuevo el password"
    );
    // const noteInput = screen.getByLabelText(/\(\*\) Nota/i  );

    // El botón debe estar deshabilitado al inicio
    let addButton = screen.getByRole("button", { name: /Registrarse/i });
    expect(addButton).toBeDisabled();

    // Completa los campos obligatorios
    fireEvent.change(nameInput, { target: { value: "J" } });
    fireEvent.change(lastNameInput, { target: { value: "Perez" } });
    fireEvent.change(emailInput, {
      target: { value: "juan.perez@example.com" },
    });
    fireEvent.change(passInput, { target: { value: "1234" } });
    fireEvent.change(passConfirmInput, { target: { value: "123456" } });
    expect(addButton).toBeDisabled();
    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(passInput, { target: { value: "123456" } });
    fireEvent.change(passConfirmInput, { target: { value: "123456" } });
    expect(addButton).not.toBeDisabled();

  });
});
