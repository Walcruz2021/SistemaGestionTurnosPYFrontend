import { render, screen, fireEvent,waitFor} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import FormGastosDir from "../../../Formulario/Gastos/FormGastosDir";
const mockStore = configureStore([]);

describe("FormGatosDir", () => {
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
        <FormGastosDir />
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
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    await user.click(screen.getByLabelText("Efectivo"));

    // ahora sí existe el input
    const inputEfectivo = screen.getByPlaceholderText("Efectivo"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox

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

    // ahora sí existe el input
    const inputTarjeta = screen.getByPlaceholderText("Tarjeta"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
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
      name: "Ingresar Gasto Directo",
    });
    expect(guardarButton).toBeDisabled();

    await user.click(screen.getByText("* Seleccione Categoria"));

    //se abre el select y se selecciona una opcion
    await user.click(await screen.findByText("Materia Prima"));

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
        screen.getByRole("button", { name: "Ingresar Gasto Directo" })
      ).toBeEnabled()
    );
  });
});
