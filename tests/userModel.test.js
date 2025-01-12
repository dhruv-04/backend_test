const { createUserHandler } = require('../src/controllers/userHandler');
const { createUser } = require('../src/models/userModel');
const httpMocks = require('node-mocks-http');
const { createHashPassword } = require('../src/utils/hashPassword');

// Mock the createUser and createHashPassword functions
jest.mock('../src/models/userModel', () => ({
  createUser: jest.fn(),
}));
jest.mock('../src/utils/hashPassword', () => ({
  createHashPassword: jest.fn(),
}));

describe('createUserHandler', () => {
  it('should return 201 status code when user is created successfully', async () => {
    createUser.mockResolvedValue({ success: true });
    createHashPassword.mockResolvedValue('hashedpassword123');

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/users',
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      },
    });
    const res = httpMocks.createResponse();

    await createUserHandler(req, res);

    expect(res.statusCode).toBe(201);
  });

  it('should return 500 status code when there is an error', async () => {
    createUser.mockRejectedValue(new Error('Database error'));
    createHashPassword.mockResolvedValue('hashedpassword123');

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/users',
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      },
    });
    const res = httpMocks.createResponse();

    await createUserHandler(req, res);

    expect(res.statusCode).toBe(500);
  });
});