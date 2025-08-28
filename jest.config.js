

/** @type {import('jest').Config} */
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/src/__mocks__/fileMock.js",

    // 👇 este es el importante
    "^src/api/configFirebase$": "<rootDir>/src/__mocks__/configFirebase.js",

    "^sweetalert2$": "<rootDir>/__mocks__/sweetalert2.js",
    "^firebase/app$": "<rootDir>/src/__mocks__/firebase/app.js",
    "^firebase/auth$": "<rootDir>/src/__mocks__/firebase/auth.js",
    "^jspdf$": "<rootDir>/__mocks__/jspdf.js",
    "^html2canvas$": "<rootDir>/__mocks__/html2canvas.js",
    "^sweetalert2-react-content$":
      "<rootDir>/__mocks__/sweetalert2-react-content.js",
    "^src/api/configFirebase$": "<rootDir>/src/__mocks__/configFirebase.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  //setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
