# GraphQL is ...
- a query language open sourced by FB in 2015
- not just for React or JS users
- compatible with any backend (SQL, Mongoose ORM, existing APIs)
- a replacement for REST

# Why not REST?
- nested queries get messy
- data joins are complicated (Model level or joining data in controllers - inconsistent approach)
- easy to over-fetch data vs. GpraphQL provides very granular level request -> speeds up API requests

# Problems with existing GraphQL documentation
- uses the low-level graphql js library
- mixes in ES6 syntax
- fragmented and incomplete

# GraphQL Schema - a way to describe your data requirements
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
# GraphQL Queries
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
# Aliases - renaming fields
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
```

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
