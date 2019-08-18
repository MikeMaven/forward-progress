var UserModel = require('../../server/db/models').User;

const userType = `type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  provider: String!
  emailConfirmed: Boolean
  profileData: String
  additionalProvidersData: String
  resetPasswordToken: String
  resetPasswordExpires: GraphQLDate
  createdAt: GraphQLDate
  updatedAt: GraphQLDate
}`;

const userQueries = `users: [User]
user(id: Int!) : User`;

const userMutations = `addUser (
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    provider: String!
  ): User
  updateUser (
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    provider: String!
  ): User
  removeUser (
    id: ID!
  ) : User`;

const users = () => {
  console.log(UserModel);
  const users = UserModel.findAll({
    order: [['createdAt', 'DESC']]
  });
  if (!users) {
    throw new Error('Error');
  }
  return users;
};

const user = (root, params) => {
  const userDetails = UserModel.findByPk(params.id);
  if (!userDetails) {
    throw new 'Error'();
  }
  return userDetails;
};

const addUser = (root, params) => {
  const userModel = new UserModel(params);
  const newUser = userModel.save();
  if (!newUser) {
    throw new Error('Error');
  }
  return newUser;
};

const updateUser = (root, params) => {
  return UserModel.findByPk(params.id).then(user => {
    if (!user) {
      throw new Error('Not Found');
    }
    return user
      .update({
        firstName: params.firstName || user.firstName,
        lastName: params.lastName || user.lastName,
        email: params.email || user.email,
        username: params.username || user.username,
        password: params.password || user.password,
        provider: params.provider || user.provider
      })
      .then(() => {
        return user;
      })
      .catch(error => {
        throw new Error(error);
      });
  });
};

const removeUser = (root, params) => {
  return UserModel.findByPk(params.id).then(user => {
    if (!user) {
      throw new Error('Not found');
    }
    return user
      .destroy()
      .then(() => {
        return user;
      })
      .catch(error => {
        throw new Error(error);
      });
  });
};

module.exports = {
  userType,
  userQueries,
  userMutations,
  users,
  user,
  addUser,
  updateUser,
  removeUser
};
