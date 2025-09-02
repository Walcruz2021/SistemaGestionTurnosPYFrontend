import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import ModalAddVentas from "../../Modal/ModalAddVtas";
const mockStore = configureStore([]);

describe("ModalAddVentas", () => {
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
        <ModalAddVentas state={true} setState={jest.fn()} />
      </Provider>
    );

  test("El campo Tipo de Servicio tiene un maximo de 100 caracteres", () => {
    renderModal();
    const inputTypeServ = screen.getByLabelText("Tipo de Servicio");
    expect(inputTypeServ).toHaveAttribute("maxLength", "100");
  });

  test("El campo Efectivo tiene un maximo de 10 caracteres", () => {
    renderModal();
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    fireEvent.click(screen.getByLabelText("Efectivo"));

    // ahora sí existe el input
    const inputEfectivo = screen.getByPlaceholderText("Efectivo"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
    expect(inputEfectivo).toHaveAttribute("maxLength", "10");
  });

  test("El campo Efectivo solo debe recibir numeros, no letras", async () => {
    renderModal();
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    fireEvent.click(screen.getByLabelText("Efectivo"));

    const user = userEvent.setup();

    const inputEfectivo = screen.getByPlaceholderText("Efectivo"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
    await user.type(inputEfectivo, "Juan Perez");
    // verificar que no queden letras en el input
    expect(inputEfectivo).toHaveValue(""); // debería quedar vacío porque solo permite números

    await user.type(inputEfectivo, "abc123def");

    expect(inputEfectivo).toHaveValue("123"); // solo quedan los dígitos
  });

  test("El campo Transferencia tiene un maximo de 10 caracteres", () => {
    renderModal();
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    fireEvent.click(screen.getByLabelText("Transferencia"));

    // ahora sí existe el input
    const inputTransferencia = screen.getByPlaceholderText("Transferencia"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
    expect(inputTransferencia).toHaveAttribute("maxLength", "10");
  });

    test("El campo Transferencia solo debe recibir numeros, no letras", async () => {
    renderModal();
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    fireEvent.click(screen.getByLabelText("Transferencia"));

    const user = userEvent.setup();

    const inputTransferencia = screen.getByPlaceholderText("Transferencia"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
    await user.type(inputTransferencia, "Juan Perez");
    // verificar que no queden letras en el input
    expect(inputTransferencia).toHaveValue(""); // debería quedar vacío porque solo permite números

    await user.type(inputTransferencia, "abc123def");

    expect(inputTransferencia).toHaveValue("123"); // solo quedan los dígitos
  });

  test("El campo Tarjeta tiene un maximo de 10 caracteres", () => {
    renderModal();
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    fireEvent.click(screen.getByLabelText("Tarjeta"));

    // ahora sí existe el input
    const inputTarjeta = screen.getByPlaceholderText("Tarjeta"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
    expect(inputTarjeta).toHaveAttribute("maxLength", "10");
  });

    test("El campo Tarjeta solo debe recibir numeros, no letras", async () => {
    renderModal();
    // Se debe activar el checkbox de lo contrario test buscara el input y al no existir fallará el test
    fireEvent.click(screen.getByLabelText("Tarjeta"));

    const user = userEvent.setup();

    const inputTarjeta = screen.getByPlaceholderText("Tarjeta"); //se lo hace por placeHolder ya que el input no tiene label, es un checkbox
    await user.type(inputTarjeta, "Juan Perez");
    // verificar que no queden letras en el input
    expect(inputTarjeta).toHaveValue(""); // debería quedar vacío porque solo permite números

    await user.type(inputTarjeta, "abc123def");

    expect(inputTarjeta).toHaveValue("123"); // solo quedan los dígitos
  });
});
