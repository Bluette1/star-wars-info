const User = require('../user');

describe('[User.find]', () => {
  it('returns null for non-existent user', async () => {
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

    const ds = new User({ store: mockStore });
    ds.initialize({ context: {} });
    const res = await ds.find({ email: 'm@gmail!', password: 'password' });
    mockStore.user.findUnique.mockReturnValueOnce(null);
    expect(res).toEqual(null);
  });

  it('returns user with token for existent user who\'s logged in', async () => {
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
    const user = { id: 1, password: 'password' };
    const ds = new User({ store: mockStore });
    mockStore.user.findUnique.mockReturnValueOnce(user);
    ds.initialize({ context: { userId: 1 } });
    const res = await ds.find({ email: 'm@gmail!', password: 'password' });
    expect(res).toEqual(user);
  });

  it('looks up user in store and returns user with token for existent user not loggedin', async () => {
    const findSpy = jest.fn();
    findSpy.mockReturnValueOnce(Promise.resolve({ id: 1, password: 'password' }));
    const mockStore = {
      user: {
        findUnique: findSpy,
        create: jest.fn(),
      },
      person: {
        create: jest.fn(),
        delete: jest.fn(),
      },
    };
    const ds = new User({ store: mockStore });
    const retrieveTokenSpy = jest.fn();
    retrieveTokenSpy.mockReturnValueOnce({ id: 1, password: 'password' });
    ds.retrieveToken = retrieveTokenSpy;

    ds.initialize({ context: {} });

    mockStore.user.findUnique.mockReturnValueOnce(Promise.resolve({ id: 1, password: 'password' }));
    const res = await ds.find({ email: 'a@a.a', password: 'password' });

    expect(mockStore.user.findUnique).toBeCalledWith({
      where: { email: 'a@a.a' },
    });
    await expect(res).toEqual({ id: 1, password: 'password' });
  });
});
