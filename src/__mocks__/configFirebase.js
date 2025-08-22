// src/__mocks__/configFirebase.js
export const auth = {
  onAuthStateChanged: jest.fn((callback) => callback(null)), // simula usuario deslogueado
};
export const db = {};
export const storage = {};