var Schema = require('graph.ql');
/*
* schema(<query>, <variables>)
        .then(function(res){
            console.log(res)
        })*/

var characters = {
    1: {
        id: 1,
        name: 'Jim'
    },
    2: {
        id: 2,
        name: 'Jake'
    },
    3: {
        id: 3,
        name: 'Bill'
    }
};
var schema = Schema(`
scalar Date

type Character {
    id: Int
    name: String!
    homeworld: Planet
    films: [Film]
}

type Film {
    title: String!
    producers(): [String]
    characters(limit: Int): [Character]
    release_date: Date
}

type Planet {
    name: String!
    population: Int
}

type Query {
    find_film (id: Int): Film
    find_character (id: Int): Character
}`, {
    Date: {
        serialize: function (v) {
            return new Date(v)
        } 
    },
    Film: {
        producers (film, args) {
            //console.log('film:', film);
            return film.producers.split(',');
        },
        characters (film, args) {
            var ids = args.limit ? film.character_ids.slice(0, args.limit) : film.character_ids;
            return ids.map(function (id) {
               return characters[id]; 
            });
        }
    },
    Planet: {
    
    },
    Query: {
        find_film (query, args) {
            //return Film.find({ id: args.id })
            //can return promise or value
            //console.log(query, args); 
            return {
                title: 'Monday Morning',
                release_date: '2017-10-23',
                producers: 'Josh,Jake,Marc',
                character_ids: [3,2,1]
            }
        },
        find_character (query, args) {
            console.log(query, args);
        }
    }
});

schema(`
    query find ($film: Int) {
        find_film(id: $film) {
            title,
            release_date,
            producers,
            characters (limit: 2) {
                id
                name
            }
        }
    }
`).then(function (res) {
    console.dir(res, { colors: true, depth: Infinity });
});
