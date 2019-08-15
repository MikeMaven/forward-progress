var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var userModule = require('./userSchema');

// Combine type definitions here using string concat
const typeDefs = `
  scalar GraphQLDate
  ${userModule.userType}

  type Query {
    ${userModule.userQueries}
  }

  type Mutation {
    ${userModule.userMutations}
  }
`;

// Combine resolvers from all schema modules
const resolvers = {
  Query: {
    user: userModule.user,
    users: userModule.users
  },
  Mutation: {
    addUser: userModule.addUser,
    updateUser: userModule.updateUser,
    removeUser: userModule.removeUser
  }
};

// Exports entire schema
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
