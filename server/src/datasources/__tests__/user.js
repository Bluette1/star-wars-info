const User = require('../user');

const user = { id: 1, password: 'password' };
const token = 'token';

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

  it('returns user for existent user who\'s logged in', async () => {
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
    mockStore.user.findUnique.mockReturnValueOnce(user);
    ds.initialize({ context: { userId: 1 } });
    const res = await ds.find({ email: 'm@gmail!', password: 'password' });
    expect(res).toEqual(user);
  });

  it('looks up user in store and returns user with token for existent user not loggedin', async () => {
    const findSpy = jest.fn();
    findSpy.mockReturnValueOnce(user);
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
    const comparePasswordsSpy = jest.fn();
    const userWithToken = { ...user, token };
    comparePasswordsSpy.mockReturnValueOnce(true);
    retrieveTokenSpy.mockReturnValueOnce(userWithToken);
    ds.retrieveToken = retrieveTokenSpy;
    ds.comparePasswords = comparePasswordsSpy;

    ds.initialize({ context: {} });

    const res = await ds.find({ email: 'a@a.a', password: 'password' });

    expect(mockStore.user.findUnique).toBeCalledWith({
      where: { email: 'a@a.a' },
    });
    await expect(res).toEqual(userWithToken);
  });

  it('returns null when passwords don\'t match', async () => {
    const findSpy = jest.fn();
    findSpy.mockReturnValueOnce(user);
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
    const comparePasswordsSpy = jest.fn();
    comparePasswordsSpy.mockReturnValueOnce(false);
    ds.comparePasswords = comparePasswordsSpy;

    ds.initialize({ context: {} });

    const res = await ds.find({ email: 'a@a.a', password: 'password' });

    expect(mockStore.user.findUnique).toBeCalledWith({
      where: { email: 'a@a.a' },
    });
    await expect(res).toEqual(null);
  });

  it('creates a new user and returns the new user with token', async () => {
    const createSpy = jest.fn();
    createSpy.mockReturnValueOnce(user);
    const mockStore = {
      user: {
        findUnique: jest.fn(),
        create: createSpy,
      },
      person: {
        create: jest.fn(),
        delete: jest.fn(),
      },
    };
    const ds = new User({ store: mockStore });
    const retrieveTokenSpy = jest.fn();
    const bcryptHashSpy = jest.fn();
    const passwordCrypt = 'crypt password';
    const userWithToken = { ...user, token };
    bcryptHashSpy.mockReturnValueOnce(passwordCrypt);
    retrieveTokenSpy.mockReturnValueOnce(userWithToken);
    ds.retrieveToken = retrieveTokenSpy;
    ds.bcryptHash = bcryptHashSpy;

    ds.initialize({ context: {} });

    const res = await ds.create({ email: 'a@a.a', password: 'password', name: 'name' });

    expect(mockStore.user.create).toBeCalledWith({
      data: { email: 'a@a.a', password: passwordCrypt, name: 'name' },
    });
    await expect(res).toEqual(userWithToken);
  });

  it('returns a user\'s favourite persons', async () => {
    const findSpy = jest.fn();
    const people = ['person'];
    const userWithPersons = { ...user, people };
    findSpy.mockReturnValueOnce(userWithPersons);
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
    ds.initialize({ context: { userId: 1 } });

    const res = await ds.getPersons();

    expect(mockStore.user.findUnique).toBeCalledWith({
      where: { id: 1 },
      include: { people: true },
    });
    await expect(res).toEqual(people);
  });
});
