import { render, screen, fireEvent } from "@testing-library/react";
import ModalAddClient from "../../Modal/ModalAddClient";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";

const mockStore = configureStore([]);

describe("ModalAddClient", () => {
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
        <ModalAddClient state={true} setState={jest.fn()} />
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
    const noteInput = screen.getByLabelText(/\(\*\) Nota/i);// se utiliza una expresion regular que busque label Nota ya que ese atributo en el formulario es dinamico, puede decir nota cliente o nota paciente
    expect(noteInput).toHaveAttribute("maxLength", "120");
  });

  test("Campo Email tiene maxLength de 40 caracteres", () => {
    renderModal();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveAttribute("maxLength", "40");
    expect(emailInput).not.toBeRequired();
  });

  test("El botón Agregar Cliente se habilita solo si los campos obligatorios están completos", async () => {
  renderModal();

  // Obtén los campos obligatorios
  const nameInput = screen.getByLabelText("(*) Nombre y Apellido");
  const phoneInput = screen.getByLabelText("(*) Teléfono Contacto");
  const addressInput = screen.getByLabelText("(*) Domicilio");
  const noteInput = screen.getByLabelText(/\(\*\) Nota/i);

  // El botón debe estar deshabilitado al inicio
  let addButton = screen.getByRole("button", { name: /Agregar/i });
  expect(addButton).toBeDisabled();

  // Completa los campos obligatorios
  fireEvent.change(nameInput, { target: { value: "Juan Perez" } });
  fireEvent.change(phoneInput, { target: { value: "123456789" } });
  fireEvent.change(addressInput, { target: { value: "Calle Falsa 123" } });
  fireEvent.change(noteInput, { target: { value: "Nota de prueba" } });

  // El botón debe estar habilitado ahora
  addButton = screen.getByRole("button", { name: /Agregar/i });
  expect(addButton).not.toBeDisabled();
});
  
});
