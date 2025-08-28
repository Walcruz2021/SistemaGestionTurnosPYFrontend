import { render, screen, fireEvent } from "@testing-library/react";
import ModalAddDog from "../../Modal/ModalAddDog";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";

const mockStore = configureStore([]);


describe("ModalAddDog", () => {

  
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
        <ModalAddDog stateAddDog={true} setStateAddDog={jest.fn()} />
      </Provider>
    );

  test("Campo Nombre de Mascota tiene maxLength de 20 caracteres", () => {
    renderModal();
    const namePet = screen.getByLabelText("(*) Nombre Mascota");
    expect(namePet).toHaveAttribute("maxLength", "20");
  });

  test("El campo Nota Mascota no es obligatorio", () => {
    renderModal();
    const notaPet = screen.getByLabelText("Nota Mascota");
    expect(notaPet).not.toHaveAttribute("required");
  });

  test("El botón 'Agregar Mascota' se habilita solo si los campos obligatorios están completos", async () => {
    renderModal();

    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/Nombre de Mascota/i);
    const clientSelect = screen.getByLabelText(/Seleccione Cliente/i);
    const sizeSelect = screen.getByLabelText(/Seleccione Tamaño/i);

    const button = screen.getByRole("button", { name: /Agregar Mascota/i });

    // Inicialmente, el botón está deshabilitado
    expect(button).toBeDisabled();

    // 👉 Simular escribir nombre
    await user.type(nameInput, "Firulais");
    expect(button).toBeDisabled();

    // 👉 Abrir y seleccionar cliente
    await user.click(clientSelect); // abre el menú
    await user.click(screen.getByText("Cliente Test"));
    expect(button).toBeDisabled();

    // 👉 Abrir y seleccionar tamaño
    await user.click(sizeSelect); // abre el menú
    await user.click(screen.getByText("grande"));

    // Ahora el botón debería estar habilitado
    expect(button).not.toBeDisabled();
  });

  // test("Llama a onSubmit con el formato correcto al agregar mascota", () => {
  //   const mockOnSubmit = jest.fn();

  //   const arrayClients = [{ value: "1", label: "Cliente Test" }];
  //   const selectTamArray = [{ value: "grande", label: "Grande" }];

  //   render(
  //     <ModalAddDog
  //       arrayClients={arrayClients}
  //       selectTamArray={selectTamArray}
  //       show={true}
  //       handleClose={() => {}}
  //       onSubmit={mockOnSubmit} // <-- pasamos función mock
  //     />
  //   );

  //   // completar campos
  //   fireEvent.change(screen.getByPlaceholderText(/Nombre de Mascota/i), {
  //     target: { value: "Firulais" },
  //   });

  //   // seleccionar cliente
  //   const clientSelect = screen.getByLabelText(/Seleccione Cliente/i);
  //   fireEvent.keyDown(clientSelect, { key: "ArrowDown" });
  //   fireEvent.click(screen.getByText("Cliente Test"));

  //   // seleccionar tamaño
  //   const sizeSelect = screen.getByLabelText(/Seleccione Tamaño/i);
  //   fireEvent.keyDown(sizeSelect, { key: "ArrowDown" });
  //   fireEvent.click(screen.getByText("Grande"));

  //   // click en botón
  //   fireEvent.click(screen.getByRole("button", { name: /Agregar Mascota/i }));

  //   // esperar que mockOnSubmit sea llamado con el formato correcto
  //   expect(mockOnSubmit).toHaveBeenCalledWith({
  //     idClient: "1",
  //     nameDog: "Firulais",
  //     notaP: "", // vacío si no lo completás
  //     tamaño: "grande",
  //   });
  // });
});
