module.exports = {
  Query: {
    people: async (_, { page = 1 }, { dataSources }) => dataSources.personAPI.getAllPeople({
      page,
    }),
    person: (_, { id, name }, { dataSources }) => {
      let response;
      if (id) {
        response = dataSources.personAPI.getPersonById({ id });
      }

      if (name) {
        response = dataSources.personAPI.getPersonByName({ name });
      }
      return response;
    },

    personDetails: (_, { id, name }, { dataSources }) => {
      let response;
      if (id) {
        response = dataSources.personAPI.getPersonDetailsById({ id });
      }

      if (name) {
        response = dataSources.personAPI.getPersonDetailsByName({ name });
      }
      return response;
    },

    me: (_, __, { dataSources }) => dataSources.userAPI.findUser(),

    myPeople: async (_, __, { dataSources }) => dataSources.userAPI.getPersonsByUser(),
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      const user = await dataSources.userAPI.findUser({ email, password });
      return user;
    },

    signup: async (_, { email, password, name }, { dataSources }) => {
      const user = await dataSources.userAPI.createUser({
        email,
        password,
        name,
      });
      return user;
    },

    postPerson: async (
      _, { personId, name }, { dataSources },
    ) => dataSources.postedPersonApi.addPerson({
      name,
      personId,
    }),

    postPersonWithName: async (_, { name }, { dataSources }) => {
      const user = await dataSources.personAPI.getPersonByNameWithId({ name });
      console.log('user', user);
      return dataSources.postedPersonApi.addPerson({
        personId: user.id,
        name,
      });
    },

    deletePersonWithName: async (_, { name }, { dataSources }) => {
      const user = dataSources.personAPI.getPersonByNameWithId({ name });
      return dataSources.postedPersonApi.removePerson({
        personId: user.id,
        name,
      });
    },
  },
  User: {
    people: async (_, __, { dataSources }) => dataSources.userAPI.getPersonsByUser(),
  },

  PostedPerson: {
    postedBy: async ({ id }, __, { dataSources }) => dataSources.postedPersonApi.postedBy({ id }),
    postedById: async (
      { id }, __, { dataSources },
    ) => dataSources.postedPersonApi.postedById({ id }),
  },
};
