import "@testing-library/jest-dom";

// Mock de Firebase
jest.mock("./src/configFirebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => callback(null)),
  },
  db: {},
  storage: {},
}));



//CODIGO QUE ELIMINAR LAS ADVERTENCIAS AL CORRER LOS TEST
const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("React Router Future Flag Warning")
    ) {
      return; // ignoramos SOLO las advertencias de React Router
    }
    originalWarn(...args); // mostramos el resto
  };
});

afterAll(() => {
  console.warn = originalWarn; // restauramos después de todos los tests
});
