import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";
import ModalEditTurnMedicine from "../../Modal/ModalEditTurnMedicine";
import { MyContext } from "./MyContext";
const mockStore = configureStore([]);

describe("ModalEditTurnMedicine", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      companySelected: { _id: "123", category: "pelu" },
      allClients: [{ _id: "1", name: "Cliente Test" }],
      categoryMedicine: false,
      typePerson: "Cliente",
    });
  });

  const mockData = {
    Client: "Juan Pérez",
    idDog: 1,
  };

  function Wrapper(props) {
    const [stateDataEdit, setStateDataEdit] = React.useState({});
    return (
      <Provider store={store}>
        <ModalEditTurnMedicine
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

  test("Renderiza input no editable Cuando SI existe Paciente asignado", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ModalEditTurnMedicine
          booleanClose={true}
          setBooleanClose={jest.fn()}
          stateDataEdit={{}}
          setStateDataEdit={jest.fn()}
          nameClient="Cliente Test"
        />
      </Provider>
    );

    const inputCliente = screen.getByDisplayValue("Cliente Test");

    // intentar escribir
    await user.type(inputCliente, "Nuevo");

    // siguen iguales (no se dejan editar)
    expect(inputCliente).toHaveValue("Cliente Test");
  });

  test("Renderiza SelectsPaciente si no hay paciente asignado", () => {
    render(
      <MyContext.Provider value={{ isMedicine: false }}>
        <Provider store={store}>
          <ModalEditTurnMedicine
            booleanClose={true}
            setBooleanClose={jest.fn()}
            stateDataEdit={{}}
            setStateDataEdit={jest.fn()}
            nameClient=""
          />
        </Provider>
      </MyContext.Provider>
    );

    const selects = screen.getAllByText(/Seleccione/i);
    expect(selects.length).toBeGreaterThan(0);
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
});
