import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import FormGastosFij from "../../../Formulario/Gastos/FormGastosFij";
const mockStore = configureStore([]);

describe("FormGatosInd", () => {
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
        <FormGastosFij />
      </Provider>
    );

  test("El campo Descripcion tiene un maximo de 80 caracteres", () => {
    renderModal();
    const inputDescriotion = screen.getByPlaceholderText(
      "* Ingrese Descripcion del Gasto"
    );
    expect(inputDescriotion).toHaveAttribute("maxLength", "80");
  });

  test("El campo Efectivo tiene un maximo de 10 caracteres y solo acepta numeros", async () => {
    const user = userEvent.setup();
    renderModal();
    // Activo el checkbox Efectivo
    await user.click(screen.getByLabelText("Efectivo"));

    const inputEfectivo = screen.getByPlaceholderText("Efectivo");

    // Escribir más de 10 caracteres (20 dígitos)
    await user.type(inputEfectivo, "12345678901234567890");

    // Debe quedar truncado a 10
    expect(inputEfectivo.value).toBe("1234567890");

    // Intentamos escribir letras
    await user.clear(inputEfectivo);
    await user.type(inputEfectivo, "abc123");

    // Debe ignorar las letras y quedarse solo con números
    expect(inputEfectivo.value).toBe("123");
  });

  test("El campo Transferencia tiene un maximo de 10 caracteres y solo acepta numeros", async () => {
    const user = userEvent.setup();
    renderModal();
    // Activo el checkbox Transferencia
    await user.click(screen.getByLabelText("Transferencia"));

    const inputTransferencia = screen.getByPlaceholderText("Transferencia");

    // Escribir más de 10 caracteres (20 dígitos)
    await user.type(inputTransferencia, "12345678901234567890");

    // Debe quedar truncado a 10
    expect(inputTransferencia.value).toBe("1234567890");

    // Intentamos escribir letras
    await user.clear(inputTransferencia);
    await user.type(inputTransferencia, "abc123");

    // Debe ignorar las letras y quedarse solo con números
    expect(inputTransferencia.value).toBe("123");
  });

  test("El campo Tarjeta tiene un maximo de 10 caracteres y solo acepta numeros", async () => {
    const user = userEvent.setup();
    renderModal();
    // Activo el checkbox Tarjeta
    await user.click(screen.getByLabelText("Tarjeta"));

    const inputTarjeta = screen.getByPlaceholderText("Tarjeta");

    // Escribir más de 10 caracteres (20 dígitos)
    await user.type(inputTarjeta, "12345678901234567890");

    // Debe quedar truncado a 10
    expect(inputTarjeta.value).toBe("1234567890");

    // Intentamos escribir letras
    await user.clear(inputTarjeta);
    await user.type(inputTarjeta, "abc123");

    // Debe ignorar las letras y quedarse solo con números
    expect(inputTarjeta.value).toBe("123");
  });

  test("El botón Guardar Gasto se habilita solo si los campos obligatorios están completos", async () => {
    const user = userEvent.setup();
    renderModal();

    // Verificamos que el botón esté deshabilitado al inicio
    const guardarButton = screen.getByRole("button", {
      name: "Ingresar Gasto Fijo",
    });
    expect(guardarButton).toBeDisabled();

    await user.click(screen.getByText("* Seleccione Categoria"));

    //se abre el select y se selecciona una opcion
    await user.click(await screen.findByText("Alquiler"));

    // Seleccionar métodos de pago
    await user.click(screen.getByLabelText("Efectivo"));
    await user.click(screen.getByLabelText("Transferencia"));
    await user.click(screen.getByLabelText("Tarjeta"));

    await user.type(screen.getByLabelText("* Fecha"), "2025-09-08");

    // Llenamos los campos obligatorios
    await user.type(
      screen.getByPlaceholderText("* Ingrese Descripcion del Gasto"),
      "Gasto de prueba"
    );

    await user.type(screen.getByPlaceholderText("Efectivo"), "100");
    await user.type(screen.getByPlaceholderText("Transferencia"), "200");
    await user.type(screen.getByPlaceholderText("Tarjeta"), "300");

    // Esperar a que el botón se habilite
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Ingresar Gasto Fijo" })
      ).toBeEnabled()
    );

    // const enabledButton = await screen.findByRole("button", {
    //   name: "Ingresar Gasto Fijo",
    // });

    // expect(enabledButton).toBeEnabled();
  });
});
