const User = require('../user');

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

const ds = new User({ store: mockStore });
ds.initialize({ context: { userId: 1 } });

describe('[User.find]', () => {
  it('returns null for non-existent user', async () => {
    ds.initialize({ context: {} });
    const res = await ds.find({ email: 'm@gmail!', password: 'password' });
    mockStore.user.findUnique.mockReturnValueOnce(null);
    expect(res).toEqual(null);
  });

  it('returns user with token for existent user', async () => {
    const res = await ds.find({ email: 'm@gmail!', password: 'password' });
    mockStore.user.findUnique.mockReturnValueOnce(null);
    expect(res).toEqual(null);
  });

  it('looks up user in store', async () => {
    ds.initialize({ context: {} });

    mockStore.user.findUnique.mockReturnValueOnce({ id: 1, password: 'password' });
    await ds.find({ email: 'a@a.a', password: 'password' });

    expect(mockStore.user.findUnique).toBeCalledWith({
      where: { email: 'a@a.a' },
    });
  });
});
