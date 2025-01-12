const { createHashPassword } = require('../../src/utils/hashPassword');
const { createUser, getUserByUsername, updateUser, deleteUser } = require('../../src/models/userModel');
const { createUserHandler, getUserByUsernameHandler, updateUserHandler, deleteUserHandler } = require('../../src/controllers/userHandler');
const httpMocks = require('node-mocks-http');

//mock the utilities and model functions
jest.mock('../../src/models/userModel', () => ({
    createUser: jest.fn(),
    getUserByUsername: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
}));

jest.mock('../../src/utils/hashPassword', () => ({
    createHashPassword: jest.fn(),
}));

describe('User handlers', () => {
    describe('createUserHandler', () => {
        it('should return 201 when user is created', async () => {
            createUser.mockResolvedValue({ sucess: true });
            
            const req = httpMocks.createRequest({
                method: 'POST',
                url: '/users',
                body: {
                    username: 'testuser',
                    email: 'testuser123@gmail.com',
                    password: 'testuser123',
                },
            });

            const res = httpMocks.createResponse();

            await createUserHandler(req, res);
            expect(res.statusCode).toBe(201);
        });
    });
});