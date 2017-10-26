## GraphQL is ...
- a query language open sourced by FB in 2015
- not just for React or JS users
- compatible with any backend (SQL, Mongoose ORM, existing APIs)
- a replacement for REST

## Why not REST?
- nested queries get messy
- data joins are complicated (Model level or joining data in controllers - inconsistent approach)
- easy to over-fetch data vs. GpraphQL provides very granular level request -> speeds up API requests

## Problems with existing GraphQL documentation
- uses the low-level graphql js library
- mixes in ES6 syntax
- fragmented and incomplete

## GraphQL Schema - a way to describe your data requirements
- Srongly typed
- Recursive
- Built-in Scalars: Int, Float, Boolean, String, ID
- Custom scalars
Adding exclamation point - required field
```
scalar Date

type Person {
    name: String!
    homeworld: Planet
    films: [Film]
}

type Film {
    title: String!
    producers: [String]
    characters: [Person]
    release_date: Date
}

type Planet {
    name: String!
    population: Int
}

type Query {
    film (id: Int): Film
    person (id: Int): Person
}
```
## GraphQL Queries
- Actions we can perform on the data: GET, MODIFY, and SUBSCRIBE to info
- Queries start in the scema.
For example, we can get a film by ID `film (id Int): Film`
```
query find($film: Int, $person: Int) {
    film(id: $film) {
        name: title
        release_date
    }
    luke: person(id: $person) {
        name
        homeworld {
            name
        }
    }
}
```
## Aliases - renaming fields
- Passing data to a query
Result can be as following:
```json
{
    "data": {
        "film": {
            "name": "A New Hope",
            "release_date": "1977-05-25"
        },
        "luke": {
            "name": "Luke Skywalker",
            "homeworld": {
                "name": "Tatooine"
            }
        }
    }
}
```
## Facebook open sourced IDE for GraphQL
[https://github.com/graphql/graphiql](https://github.com/graphql/graphiql)
- can write and run queries
## Several ways to set up graphiql
- separate endpoint
- stand-alone app by Skevy [https://github.com/skevy/graphiql-app](https://github.com/skevy/graphiql-app)
- Connect to existing GraphQL server - Middleware [https://github.com/matthewmueller/express-graph.ql](https://github.com/matthewmueller/express-graph.ql)

![GraphiQL-IDE](https://raw.githubusercontent.com/Vladislav-Vinnikov-Narvar/graphql-notes/master/screenshots/GraphiQL-IDE.png)
`Ctrl+Space` for autocomplete

## Dataloader
- Open source project by Facebook
- Used to cache concurrent requests going to the same resource
- Aims to speed up requests that are duplicates

### Timing query requests
```js
console.time('without data loader');
//code
console.timeEnd('without data loader');
```
### Getting started with graph ql

```
yarn init -y
- Init project and nswer yes to all questions
yarn add graphql
- We add graphql to our project
yarn add express express-graphql


npm i graph.ql

var Schema = require('graph.ql);
var schema = Schema(<schems>)

    schema(<query>, <variables>)
        .then(function(res){
            console.log(res)
        })
```
For each of the types we add an object
```
type Query {
    find_film (id: Int): Film
    find_person (id: Int): Person
}`, {
    Date: {

    },
    Film: {

    },
    Planet: {

    },
    Query: {
        find_film (query, args) {

        },
        find_person (query, args) {

        }
    }
});
```
By default node colapses objects of a certain depth, to avoid that: `console.dir(res, { colors: true, depth: Infinity });`

```
schema(`
    query find ($film: Int) {
        find_film(id: $film) {
            title,
            release_date,
            producers,
            characters (limit: 2) {
                name
                homeworld {
                    name
                    population
                }
                films {
                    title
                }
            }
        }
    }`, {
        film: 1
    }).then(function (res) {
    console.dir(res, { colors: true, depth: Infinity });
});
```
