var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var UserModel = require('../server/db/models').User;

var userType = new GraphQLObjectType({
  name: 'user',
  fields: function() {
    return {
      id: {
        type: GraphQLID
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      provider: {
        type: GraphQLString
      },
      emailConfirmed: {
        type: GraphQLBoolean
      },
      profileData: {
        type: GraphQLString
      },
      additionalProvidersData: {
        type: GraphQLString
      },
      resetPasswordToken: {
        type: GraphQLString
      },
      resetPasswordExpires: {
        type: GraphQLDate
      },
      createdAt: {
        type: GraphQLDate
      },
      updatedAt: {
        type: GraphQLDate
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function() {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: function() {
          const users = UserModel.findAll({
            order: [['createdAt', 'DESC']]
          });
          if (!users) {
            throw new Error('Error');
          }
          return users;
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt
          }
        },
        resolve: function(root, params) {
          const userDetails = UserModel.findByPk(params.id);
          if (!userDetails) {
            throw new 'Error'();
          }
          return userDetails;
        }
      }
    };
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function() {
    return {
      addUser: {
        type: userType,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          provider: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error('Error');
          }
          return newUser;
        }
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          firstName: {
            name: 'firstName',
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            name: 'lastName',
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            name: 'username',
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            name: 'password',
            type: new GraphQLNonNull(GraphQLString)
          },
          provider: {
            name: 'provider',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
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
        }
      },
      removeUser: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
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
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});
