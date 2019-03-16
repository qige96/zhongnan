const { gql } = require('apollo-server-koa');

const User = require('./user-model')


// Construct a schema, using GraphQL schema language


exports.typeDefs = gql`
  type Query {
    hello: String
    user(userId:Int, username:String): [User]
  }

  type User {
    userId: Int
    username: String,
    age: Int,
    gender: Boolean
  }

  type Mutation {
    updateUser(userId:Int, username:String, age:Int): User
  }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: async (parent, args) => {
      let users;
      if(args.userId){
        users = await User.find({userId:args.userId});
      }
      else{
        users = await User.find({username:args.username})
      }
      return users   
    },
  },
  User: {
    userId: user => user.userId,
    username: (user)=>{return user.username;},
    age: (user)=>{return user.age;},
    gender: (user)=>{return user.gender},
  },
  Mutation: {
    async updateUser(parent, args){
      await User.updateOne(args)
      const user = await User.findOne({userId: args.userId})
      // console.log(user)
      return user
    }
  }
};
