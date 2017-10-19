'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3123;

const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'Video of GraphQL',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the video.'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video in seconds',
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or no viewer watched the video',
        }
    },
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise((resolve) => {
                resolve({
                    id: 'a',
                    title: 'GraphQL',
                    duration: 180,
                    watched: false,
                })
            }),
        }   
    }
});

const schema = new GraphQLSchema({
    query: queryType,
});

const videoA = {
    id: 'a',
    title: 'Create a graphQL Schema',
    duration: 120,
    watched: true
};
const videoB = {
    id: 'b',
    title: 'Ember.js CLI',
    duration: 240,
    watched: false
};
const videos = [videoA, videoB];


const query = `
query myFirstQuery {
    video {
        id,
        title,
        duration,
        watched
    },
    videos {
        id,
        title,
        duration,
        watched
    }
}`;


server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
