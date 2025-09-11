// src/__tests__/TableTurns.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TableTurns from "../TableTurns";
import Swal from "sweetalert2";
import * as actions from "../../reducer/actions/actionsTurnos";
import { FaFileAlt } from "react-icons/fa";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

// ✅ mock sin thunk
jest.mock("../../reducer/actions/actionsTurnos", () => ({
  deleteTurno: jest.fn(() => Promise.resolve()),
  getTurnos: jest.fn(() => Promise.resolve()),
}));

// Mock store
const mockStore = configureStore([]);

describe("TableTurns component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      companySelected: { category: "peluAndVet", _id: "123" },
      allTurnos: [
        {
          _id: "6894e634e179027cbf200b45",
          name: "Maria Elena Fuseneko",
          nameDog: "Kaiser",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
      ],
      categoryMedicine: false,
      typePerson: "Cliente",
    });

    // ✅ ahora dispatch siempre devuelve una promesa
    store.dispatch = jest.fn(() => Promise.resolve());
  });

  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <TableTurns
          order={false}
          setInfo={jest.fn()}
          stateInfo={false}
          setOrder={jest.fn()}
          {...props}
        />
      </Provider>
    );

  it("muestra encabezados con 'Nombre Mascota' si categoryMedicine es false", () => {
    renderComponent();

    expect(screen.getByText(/Nombre Mascota/i)).toBeInTheDocument();
    expect(screen.getByText(/Fecha/i)).toBeInTheDocument();
    expect(screen.getByText(/Horario/i)).toBeInTheDocument();
    expect(screen.getByText(/Opciones/i)).toBeInTheDocument();
  });

  it("muestra encabezados con 'Nombre Paciente' si categoryMedicine es true", () => {
    store = mockStore({
      companySelected: { category: "medicinaGral", _id: "123" },
      allTurnos: [],
      categoryMedicine: true, // 👈 ahora true
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    expect(screen.getByText(/Nombre Paciente/i)).toBeInTheDocument();
    expect(screen.getByText(/Fecha/i)).toBeInTheDocument();
    expect(screen.getByText(/Horario/i)).toBeInTheDocument();
    expect(screen.getByText(/Opciones/i)).toBeInTheDocument();
  });

  it("muestra botón AddFicha si categoryMedicine es true o category=peluAndVet", () => {
    // ⚡ Creamos el store cumpliendo la condición
    store = mockStore({
      companySelected: { category: "peluAndVet", _id: "123" },
      allTurnos: [
        {
          _id: "6894e634e179027cbf200b45",
          name: "Maria Elena Fuseneko",
          nameDog: "Kaiser",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
      ],
      categoryMedicine: true, // 👉 cumple condición
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    // 🔎 Verificamos que se renderizó el botón con el ícono FaFileAlt
    const addFichaBtn = screen.getByRole("button", { name: /AddFicha/i });
    expect(addFichaBtn).toBeInTheDocument();

    // opcional: validar que dentro tenga el ícono de FaFileAlt
    expect(addFichaBtn.querySelector("svg")).toBeInTheDocument();
  });

  it("NO muestra botón AddFicha si categoryMedicine es false y category !== peluAndVet", () => {
    store = mockStore({
      companySelected: { category: "otraCategoria", _id: "123" }, // ❌ distinta
      allTurnos: [
        {
          _id: "6894e634e179027cbf200b45",
          name: "Maria Elena Fuseneko",
          nameDog: "Kaiser",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
      ],
      categoryMedicine: false, // ❌ no cumple condición
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    // 🔎 el botón no debe estar
    expect(
      screen.queryByRole("button", { name: /AddFicha/i })
    ).not.toBeInTheDocument();
  });

  it("botón AddFicha deshabilitado si categoryMedicine es true y no existe un Paciente asignado", () => {
    store = mockStore({
      companySelected: { category: "medicinaGral", _id: "123" },
      allTurnos: [
        {
          _id: "6894e634e179027cbf200b45",
          name: "",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
      ],
      categoryMedicine: true, //
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    const addFichaBtn = screen.getByRole("button", { name: /AddFicha/i });
    expect(addFichaBtn).toBeDisabled();
  });

  it("botón AddFicha deshabilitado si categoryMedicine es false o category == peluAndVet y no existe un Paciente/Dog asignado", () => {
    store = mockStore({
      companySelected: { category: "medicinaGral", _id: "123" },
      allTurnos: [
        {
          _id: "68b83f4ba0e3ec9c114bc540",
          name: "",
          nameDog: "",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
        {
          _id: "68b83f52e07c45335e8d51fe",
          name: "",
          nameDog: "pruebaPet",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
        {
          _id: "68b83f581c7425c45ac63a57",
          name: "Dardo Fuseneko",
          nameDog: "",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
        {
          _id: "68b83f6085b2081bfd0f8d55",
          name: "Dardo Fuseneko",
          nameDog: "",
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
      ],
      categoryMedicine: true, //
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    // obtenemos todos los botones con aria-label AddFicha
    const addFichaBtns = screen.getAllByRole("button", { name: /AddFicha/i });

    // verificamos que todos están deshabilitados
    addFichaBtns.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("renderiza 'Paciente No Asignado' en turnos donde solo existen fechas y horarios. Category===pelu o peluAndVet", () => {
    store = mockStore({
      companySelected: { category: "otraCategoria", _id: "123" },
      allTurnos: [
        {
          _id: "68b7739e7464d4ba931442aa",
          name: "Maria Elena Fuseneko",
          nameDog: "Kaiser", // ✅ debería mostrar este nombre
          date: "07/08/2025",
          time: "14:00",
          isNotifications: true,
        },
        {
          _id: "68b7738eed88f139947b7d50",
          name: "",
          nameDog: "", // ❌ debería mostrar "Paciente No Asignado"
          date: "07/08/2025",
          time: "14:00",
          isNotifications: false,
        },
        {
          _id: "68b7738205cd0b8abd1c1186",
          name: null,
          nameDog: null, // ❌ también debería mostrar "Paciente No Asignado"
          date: "08/08/2025",
          time: "15:00",
          isNotifications: false,
        },
      ],
      categoryMedicine: false,
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    // ✅ aparece el nombre de la mascota
    expect(screen.getByText("Kaiser")).toBeInTheDocument();

    // ✅ aparece el mensaje para los turnos vacíos (2 veces en este caso)
    expect(screen.getAllByText(/Paciente No Asignado/i)).toHaveLength(2);
  });

  it("muestra el nombre del paciente si categoryMedicine es true y existe name", () => {
    store = mockStore({
      companySelected: { category: "medicinaGral", _id: "123" },
      allTurnos: [
        {
          _id: "1",
          name: "Maria Elena Fuseneko",
          date: "07/08/2025",
          time: "14:00",
        },
      ],
      categoryMedicine: true, // ✅ cambia a true
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    expect(screen.getByText(/Maria Elena Fuseneko/i)).toBeInTheDocument();
  });

  it("muestra 'Paciente NO Asignado' si no existe name", () => {
    store = mockStore({
      companySelected: { category: "medicinaGral", _id: "123" },
      allTurnos: [
        {
          _id: "2",
          name: "",
          date: "07/08/2025",
          time: "14:00",
        },
      ],
      categoryMedicine: false,
      typePerson: "Cliente",
    });
    store.dispatch = jest.fn(() => Promise.resolve());

    renderComponent();

    expect(screen.getByText(/Paciente NO Asignado/i)).toBeInTheDocument();
  });

  // it("clic en botón Eliminar llama a Swal y dispatch", async () => {
  //   renderComponent();

  //   // buscamos el botón por testid
  //   const eliminarBtn = screen.getByTestId("btn-eliminar");
  //   fireEvent.click(eliminarBtn);

  //   // verificamos que Swal.fire se haya llamado
  //   expect(Swal.fire).toHaveBeenCalled();

  //   await waitFor(() => {
  //     expect(actions.deleteTurno).toHaveBeenCalledWith(
  //       "6894e634e179027cbf200b45"
  //     );
  //   });

  //   await waitFor(() => {
  //     expect(actions.getTurnos).toHaveBeenCalledWith("123"); // id de la empresa
  //   });
  // });
});
