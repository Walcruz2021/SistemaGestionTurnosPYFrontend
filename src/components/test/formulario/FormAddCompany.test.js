import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import FormAddCompany from "../../Formulario/FormAddCompany";
import { MemoryRouter } from "react-router-dom";
const mockStore = configureStore([]);

describe("FormAddCompany", () => {
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
          <FormAddCompany />
        </MemoryRouter>
      </Provider>
    );

  test("El campo Nombre tiene minimo de 2 caracteres y un maximo de 30 caracteres", () => {
    renderModal();
    const inputName = screen.getByLabelText("(*) Nombre de la Empresa");
    expect(inputName).toHaveAttribute("minLength", "2");
    expect(inputName).toHaveAttribute("maxLength", "30");
    // fireEvent.change(inputName, { target: { value: "123456789012DFDFDGSDVdsfsdfdsf34567890" } });
    // expect(inputName.value.length).toBeLessThanOrEqual(30);
  });

  test("El campo Domicilio tiene maximo de 30 caracteres", () => {
    renderModal();
    const address = screen.getByLabelText("(*) Domicilio");
    expect(address).toHaveAttribute("maxLength", "30");
    // fireEvent.change(address, { target: { value: "123456789012345678901234567890dsfwed" } });
    // expect(address.value.length).toBeLessThanOrEqual(30);
  });

  test("El campo CUIT tiene un minimo de 2 caracteres y un maximo de 15 caracteres y solo recibe numeros", () => {
    renderModal();
    const passInput = screen.getByLabelText("(*) Cuit");
    fireEvent.change(passInput, { target: { value: "abc123" } });

    // Esperamos que se guarden solo los números
    expect(passInput.value).toBe("123");
    expect(passInput).toHaveAttribute("minLength", "2");
    expect(passInput).toHaveAttribute("maxLength", "15");
    fireEvent.change(passInput, { target: { value: "12345678901234567890" } });
    expect(passInput.value.length).toBeLessThanOrEqual(15);
  });

  test("Boton se habilita si se completan los valores obligatorios", async () => {
    renderModal();
    const inputName = screen.getByLabelText("(*) Nombre de la Empresa");
    const address = screen.getByLabelText("(*) Domicilio");
    const cuit = screen.getByLabelText("(*) Cuit");
    const radioPelu = screen.getByRole("radio",{name:"Peluqueria"});
    const boton = screen.getByRole("button", { name: "Adherir Empresa" });
    expect(boton).toBeDisabled();

    // Ingresamos solo espacios
    fireEvent.change(inputName, { target: { value: "   " } });
    fireEvent.change(address, { target: { value: "   " } });
    fireEvent.change(cuit, { target: { value: "   " } });

    expect(boton).toBeDisabled(); // ✅ debería seguir deshabilitado

    fireEvent.change(inputName, { target: { value: "Empresa Test" } });
    fireEvent.change(address, { target: { value: "Domicilio Test" } });
    fireEvent.change(cuit, { target: { value: "20304050607" } });
    userEvent.click(radioPelu);
    await waitFor(() => expect(radioPelu).toBeChecked());
    expect(boton).toBeEnabled();
  });
});
