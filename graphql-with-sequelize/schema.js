import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

import Db from './db';
//Emulate or overlate sequalize Schema

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      //resolve function invoked - graphql knows how to get the data
      // via sequelize
      id: {
        type: GraphQLInt,
        resolve(person) {
          return person.id
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(person) {
          return person.firstName
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(person) {
          return person.lastName
        }
      },
      email: {
        type: GraphQLString,
        resolve(person) {
          return person.email
        }
      },
    }
  }
});

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a Post',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(person) {
          return person.id
        }
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title
        }
      },
      content: {
        type: GraphQLString,
        resolve(post) {
          return post.content
        }
      },
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        //limit arguments to a particular list of fields
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          //Sequelize connection
          //Args going to be filled in with data like email address or name
          return Db.models.person.findAll({ where: args });
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(root, args) {
          //Sequelize connection
          //Args going to be filled in with data like email address or name
          return Db.models.post.findAll({ where: args });
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
