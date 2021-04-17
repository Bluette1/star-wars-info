module.exports = {
  Query: {
    people: async (_, { page = 1 }, { dataSources }) => dataSources.person.getAll({
      page,
    }),
    person: (_, { id, name }, { dataSources }) => {
      let response;
      if (id) {
        response = dataSources.person.getById({ id });
      }

      if (name) {
        response = dataSources.person.getByName({ name });
      }
      return response;
    },

    personDetails: (_, { id, name }, { dataSources }) => {
      let response;
      if (id) {
        response = dataSources.person.getDetailsById({ id });
      }

      if (name) {
        response = dataSources.person.getDetailsByName({ name });
      }
      return response;
    },

    me: (_, __, { dataSources }) => dataSources.user.find(),

    myPeople: async (_, __, { dataSources }) => dataSources.user.getPersons(),
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      const user = await dataSources.user.find({ email, password });
      return user;
    },

    signup: async (_, { email, password, name }, { dataSources }) => {
      const user = await dataSources.user.create({
        email,
        password,
        name,
      });
      return user;
    },

    postPerson: async (
      _, { personId, name }, { dataSources },
    ) => dataSources.favourite.add({
      name,
      personId,
    }),

    postPersonWithName: async (_, { name }, { dataSources }) => {
      const user = await dataSources.person.getByNameWithId({ name });
      return dataSources.favourite.add({
        personId: user.id,
        name,
      });
    },

    deletePersonWithName: async (_, { name }, { dataSources }) => {
      const person = await dataSources.person.getByNameWithId({ name });
      return dataSources.favourite.remove({
        personId: person.id,
      });
    },
  },
  User: {
    people: async (_, __, { dataSources }) => dataSources.user.getPersons(),
  },

  PostedPerson: {
    postedBy: async ({ id }, __, { dataSources }) => dataSources.favourite.postedBy({ id }),
    postedById: async (
      { id }, __, { dataSources },
    ) => dataSources.favourite.postedById({ id }),
  },
};
