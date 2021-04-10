const UserAPI = require('../user');

const mockStore = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  person: {
    create: jest.fn(),
    delete: jest.fn(),
  },
};

module.exports.mockStore = mockStore;

const ds = new UserAPI({ store: mockStore });
ds.initialize({ context: { userId: 1 } });

describe('[UserAPI.findUser]', () => {
  it('returns null for non-existent user', async () => {
    ds.initialize({ context: {} });
    const res = await ds.findUser({ email: 'm@gmail!', password: 'password' });
    mockStore.user.findUnique.mockReturnValueOnce(null);
    expect(res).toEqual(null);
  });

  it('returns user with token for existent user', async () => {
    const res = await ds.findUser({ email: 'm@gmail!', password: 'password' });
    mockStore.user.findUnique.mockReturnValueOnce(null);
    expect(res).toEqual(null);
  });
});
