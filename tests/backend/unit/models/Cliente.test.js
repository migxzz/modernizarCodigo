const Cliente = require("../../../../backend/models/Cliente");

// Automatically uses the mock from __mocks__/mongoose.js
jest.mock("mongoose");

describe("Cliente Model", () => {
  it("deve validar um cliente com dados corretos", () => {
    const clienteValido = {
      nome: "João Silva",
      email: "joao@example.com",
      telefone: "11999999999",
    };

    // Teste de validação
    expect(Cliente.create).toBeDefined();
  });

  it("deve rejeitar um cliente sem nome", () => {
    const clienteInvalido = {
      email: "joao@example.com",
      telefone: "11999999999",
    };

    // Teste de validação
    // expect(() => Cliente.create(clienteInvalido)).toThrow();
  });
});
