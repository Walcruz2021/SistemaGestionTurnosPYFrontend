import { render, screen, fireEvent } from "@testing-library/react";
import ModalEditPet from "../../Modal/ModalEditDog";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event"; //maneja interacciones con reac-select para que el test sea mas realista y menos propenso a fallar
import Swal from "sweetalert2";

const mockStore = configureStore([]);

describe("ModalEditPet", () => {
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
        <ModalEditPet
          state={true}
          setStateModal={jest.fn()}
          idDog="1"
          notaP="es malo"
          nameDog="Firulais"
          tamaño="grande"
        />
      </Provider>
    );

  test("Campo Nombre de Mascota tiene maxLength de 20 caracteres", () => {
    renderModal();
    const namePet = screen.getByLabelText("(*) Nombre Mascota");
    expect(namePet).toHaveAttribute("maxLength", "20");
  });

  test("Campo Nota Mascota tiene maxLength de 100 caracteres", () => {
    renderModal();
    const notaPet = screen.getByLabelText("Nota Mascota");
    expect(notaPet).toHaveAttribute("maxLength", "100");
  });

  test("El botón Editar Mascota está habilitado al inicio si los campos vienen completos", () => {
    renderModal({
      idDog: "1",
      notaP: "es malo",
      nameDog: "Firulais",
      tamaño: "grande",
    });

    const button = screen.getByRole("button", { name: /Modificar/i });
    expect(button).not.toBeDisabled();
  });

  test("El botón Editar  se deshabilita si se borran los campos obligatorios", () => {
    renderModal({
      idDog: "1",
      notaP: "es malo",
      nameDog: "Firulais",
      tamaño: "grande",
    });

    const button = screen.getByRole("button", { name: /Modificar/i });
    expect(button).not.toBeDisabled();

    const namePet = screen.getByLabelText("(*) Nombre Mascota");
    fireEvent.change(namePet, { target: { value: "" } });

    expect(button).toBeDisabled();
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
