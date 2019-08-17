var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var userModule = require('./schemas/userSchema');
var noteModule = require('./schemas/noteSchema')

// Combine type definitions here using string concat
const typeDefs = `
  scalar GraphQLDate
  ${userModule.userType}
  ${noteModule.noteType}

  type Query {
    ${userModule.userQueries}
    ${noteModule.noteQueries}
  }

  type Mutation {
    ${userModule.userMutations}
    ${noteModule.noteMutations}
  }
`;

// Combine resolvers from all schema modules
const resolvers = {
  Query: {
    //users
    user: userModule.user,
    users: userModule.users,
    //notes
    note: noteModule.note,
    notes: noteModule.notes
  },
  Mutation: {
    //users
    addUser: userModule.addUser,
    updateUser: userModule.updateUser,
    removeUser: userModule.removeUser,
    //notes
    addNote: noteModule.addNote,
    updateNote: noteModule.updateNote,
    removeNote: noteModule.removeNote
  }
};

// Exports entire schema
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
