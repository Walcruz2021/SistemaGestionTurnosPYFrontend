import "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import 'intersection-observer';

// Mock global
beforeAll(() => {
  jest.spyOn(reactRedux, "useDispatch").mockReturnValue(jest.fn());
  jest.spyOn(reactRedux, "useSelector").mockImplementation((selector) =>
    selector({})
  );
});



// Mock de Firebase
jest.mock("./src/configFirebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => callback(null)),
  },
  db: {},
  storage: {},
}));

class IntersectionObserver {
  constructor(callback, options) {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

global.IntersectionObserver = IntersectionObserver;

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
