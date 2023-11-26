const { getUserById } = require('../controller/controller');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('Controller Functions', () => {

  describe('getUserById', () => {
    it('should successfully retrieve a user by ID', async () => {
      const req = { params: { id: 'fakeUserId' } };
      const res = { status: jest.fn(), json: jest.fn() };

      User.findById.mockResolvedValueOnce({ name: 'John' });

      await getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('fakeUserId');
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ name: 'John' });
    });

  });


})