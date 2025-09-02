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
