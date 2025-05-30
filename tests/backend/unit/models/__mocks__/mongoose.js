module.exports = {
  Schema: jest.fn().mockImplementation(() => ({
    pre: jest.fn().mockReturnThis(),
  })),
  model: jest.fn().mockReturnValue({
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  }),
};