var axios = require('axios');
var Schema = require('graph.ql');

var schema = Schema(`
scalar Date

type Character {
    name: String!
    eye_color: String
    gender: String
    homeworld(): Planet
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
    population: String
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
    Character: {
        homeworld (character, args) {
            return axios.get(character.homeworld)
                .then(res => res.data);
        }
    },
    Film: {
        producers (film, args) {
            //console.log('film:', film);
            return film.producer.split(/\s*,\s*/);
        },
        characters (film, args) {
            return axios.all(film.characters.map(url => {
                return axios.get(url).then(res => res.data)
            }));
       }
    },
    Planet: {
    
    },
    Query: {
        find_film (query, args) {
            return axios.get(`https://swapi.co/api/films/${args.id}/`, {
                params: { responseType: 'json'}
            }).then(res => res.data);
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
                name
                homeworld {
                    name
                    population
                }
            }
        }
    }`, {
        film: 1
    }).then(function (res) {
    console.dir(res, { colors: true, depth: Infinity });
});
