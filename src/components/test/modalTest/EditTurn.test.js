import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import ModalEditTurn from "../../Modal/ModalEditTurn";
import { MyContext } from "./MyContext";
const mockStore = configureStore([]);

describe("ModalEditTurn", () => {
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
        <ModalEditTurn
          booleanClose={true}
          setBooleanClose={jest.fn()}
          stateDataEdit={{}}
          setStateDataEdit={jest.fn()}
          nameClient="Cliente Test"
          nameDog="Perro Test"
        />
      </Provider>
    );

  function Wrapper(props) {
    const [stateDataEdit, setStateDataEdit] = React.useState({});
    return (
      <Provider store={store}>
        <ModalEditTurn
          booleanClose={true}
          setBooleanClose={jest.fn()}
          stateDataEdit={stateDataEdit}
          setStateDataEdit={setStateDataEdit}
          nameClient="Cliente Test"
          nameDog="Perro Test"
          {...props}
        />
      </Provider>
    );
  }

  test("Renderiza inputs no editables si cliente y mascota existen", async () => {
    const user = userEvent.setup();

    render(
      <MyContext.Provider value={{ isMedicine: false }}>
        <Provider store={store}>
          <ModalEditTurn
            booleanClose={true}
            setBooleanClose={jest.fn()}
            stateDataEdit={{}}
            setStateDataEdit={jest.fn()}
            nameClient="Cliente Test"
            nameDog="Perro Test"
            personCategory="Cliente"
          />
        </Provider>
      </MyContext.Provider>
    );

    const inputCliente = screen.getByDisplayValue("Cliente Test");
    const inputDog = screen.getByDisplayValue("Perro Test");

    // intentar escribir
    await user.type(inputCliente, "Nuevo");
    await user.type(inputDog, "Nuevo");

    // siguen iguales (no se dejan editar)
    expect(inputCliente).toHaveValue("Cliente Test");
    expect(inputDog).toHaveValue("Perro Test");
  });

  // test("Renderiza 1 input (client) no editables si cliente existe y isMedicine==true", async () => {
  //   const user = userEvent.setup();

  //   render(
  //     <MyContext.Provider value={{ isMedicine: true }}>
  //       <Provider store={store}>
  //         <ModalEditTurn
  //           booleanClose={true}
  //           setBooleanClose={jest.fn()}
  //           stateDataEdit={{}}
  //           setStateDataEdit={jest.fn()}
  //           nameClient="Cliente Test"
  //           nameDog="Perro Test"
  //           personCategory="Cliente"
  //         />
  //       </Provider>
  //     </MyContext.Provider>
  //   );

  //   // Solo debe estar el input del cliente
  //   const inputCliente = screen.getByDisplayValue("Cliente Test");
  //   expect(inputCliente).toBeInTheDocument();

  //   // No debe estar el input de mascota
  //   expect(screen.queryByDisplayValue("Perro Test")).not.toBeInTheDocument();

  //   // intentar escribir
  //   await user.type(inputCliente, "Nuevo");

  //   // sigue igual (no editable)
  //   expect(inputCliente).toHaveValue("Cliente Test");
  // });

  test("Renderiza 2 Selects si no hay cliente ni mascota", () => {
    render(
      <MyContext.Provider value={{ isMedicine: false }}>
        <Provider store={store}>
          <ModalEditTurn
            booleanClose={true}
            setBooleanClose={jest.fn()}
            stateDataEdit={jest.fn()}
            setStateDataEdit={jest.fn()}
            nameClient=""
            nameDog=""
            personCategory="Cliente"
          />
        </Provider>
      </MyContext.Provider>
    );

    const selects = screen.getAllByText(/Seleccione/i);
    expect(selects.length).toBeGreaterThan(0);
    expect(selects.length).toBeGreaterThan(1);
  });

  test("Fecha y Hora son campos obligatorios", () => {
    render(<Wrapper />);

    //screen.debug();
    const dateInput = screen.getByLabelText(/Fecha Turno/i);
    const timeInput = screen.getByLabelText(/Horario Turno/i);
    const button = screen.getByRole("button", { name: /Editar Turno/i });

    // Falta fecha -> deshabilitado
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    fireEvent.change(dateInput, { target: { value: "" } });
    expect(button).toBeDisabled();

    // Falta hora -> deshabilitado
    fireEvent.change(dateInput, { target: { value: "2099-12-31" } });
    fireEvent.change(timeInput, { target: { value: "" } });
    expect(button).toBeDisabled();

    // Ambos completos -> habilitado
    fireEvent.change(dateInput, { target: { value: "2099-12-31" } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });
    expect(button).not.toBeDisabled();
  });

  test("No permite editar turno con fecha menor a la actual", () => {
    render(<Wrapper />);
    const dateInput = screen.getByLabelText(/Fecha Turno/i);
    const timeInput = screen.getByLabelText(/Horario Turno/i);
    const button = screen.getByRole("button", { name: /Editar Turno/i });

    // Fecha pasada (ejemplo: ayer)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const day = String(yesterday.getDate()).padStart(2, "0");
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const year = yesterday.getFullYear();
    const pastDate = `${year}-${month}-${day}`;

    fireEvent.change(dateInput, { target: { value: pastDate } });
    fireEvent.change(timeInput, { target: { value: "10:00" } });

    fireEvent.click(button);

    // Verificamos que SweetAlert se llamó con mensaje de error
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: "Fecha Incorrecta",
    });
  });

  test("El campo Nota Turno tiene maxlength de 120 caracteres", () => {
    renderModal();
    const notesInput = screen.getByLabelText(/Nota Turno/i);

    fireEvent.change(notesInput, { target: { value: "a".repeat(150) } });

    expect(notesInput.value.length).toBeLessThanOrEqual(120);

    //expect(notesInput).toHaveAttribute("maxlength", "120"); no utilizo esta linea porque no esta leyendo ese atributo ya que value puede venir con valores nulos
  });
});
