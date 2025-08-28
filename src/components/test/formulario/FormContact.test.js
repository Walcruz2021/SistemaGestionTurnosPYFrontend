import { render, screen, fireEvent } from "@testing-library/react";
import FormSoporteContact from "../../Formulario/FormSoporteContact";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";

const mockStore = configureStore([]);
const store = mockStore({
  user: { email: "test@test.com" }, // estado inicial simulado
});

// cone sto fuerzo al mock IntersectionObserver para que se aplique antes de correr el test. Se evita el error ReferenceError: IntersectionObserver is not defined
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const renderModal = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <FormSoporteContact />
      </MemoryRouter>
    </Provider>
  );

test("Campo Comentario tiene maxLength de 300 caracteres", () => {
  renderModal();

  const commentInput = screen.getByLabelText(/Ingrese su Comentario/i);
  expect(commentInput).toHaveAttribute("maxLength", "300");
});

test("Campo Email tiene maxLength de 35 caracteres", () => {
  renderModal();

  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toHaveAttribute("maxLength", "35");
});

test("EL boton se debe activar cuando los dos campos Email y Comentario esten completos", async() => {
  renderModal();

  const user = userEvent.setup();
  const emailInput = screen.getByLabelText(/Email/i);
  const commentInput = screen.getByLabelText(/Ingrese su Comentario/i);
  const button = screen.getByRole("button", { name: /Enviar/i });

  // Inicialmente, el botón está deshabilitado
  expect(button).toBeDisabled();
  await user.type(emailInput, "walcruz1988.21@gmail.com");
  expect(button).toBeDisabled();
  await user.type(commentInput, "tengo un problema");
  expect(button).not.toBeDisabled();
});
