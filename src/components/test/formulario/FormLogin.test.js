import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import FormLogin from "../../Formulario/FormLoginNew";
import { MemoryRouter } from "react-router-dom";
const mockStore = configureStore([]);

describe("FormLogin", () => {
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
          <FormLogin />
        </MemoryRouter>
      </Provider>
    );

  test("El campo Email tiene maximo de 30 caracteres", () => {
    renderModal();
    const inputEmail = screen.getByPlaceholderText("Ingrese su Email");
    expect(inputEmail).toHaveAttribute("maxLength", "30");
  });

  test("El campo Contraseña maximo de 20 caracteres", () => {
    renderModal();
    const passInput = screen.getByPlaceholderText("Ingrese Contraseña");
    expect(passInput).toHaveAttribute("maxLength", "20");
  });

  test("El botón Login se habilita solo si los campos obligatorios están completos y cumplen con todos los requisitos", async () => {
    renderModal();

    // Obtén los campos obligatorios
    const emailInput = screen.getByPlaceholderText("Ingrese su Email");
    const contraseñaInput = screen.getByPlaceholderText("Ingrese Contraseña");

    // const noteInput = screen.getByLabelText(/\(\*\) Nota/i  );

    // El botón debe estar deshabilitado al inicio
    let addButton = screen.getByRole("button", { name: /Inicio de Sesión/i });
    expect(addButton).toBeDisabled();

    // Completa los campos obligatorios
    fireEvent.change(emailInput, {
      target: { value: "juan.perez@example.com" },
    });
    fireEvent.change(contraseñaInput, { target: { value: "" } });

    expect(addButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(contraseñaInput, { target: { value: "123456" } });

    expect(addButton).toBeDisabled();
    fireEvent.change(emailInput, {
      target: { value: "juan.perez@example.com" },
    });
    expect(addButton).not.toBeDisabled();
  });
});
