import confgi from "../../api/configFirebase"
export const getAuth = jest.fn();
jest.mock("../../api/configFirebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((cb) => cb(null)), // null = sin usuario
  },
  db: {},
  storage: {},
}));

test("App muestra login cuando no hay usuario", () => {
  render(<App />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});