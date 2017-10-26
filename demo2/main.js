var axios = require('axios');
var Schema = require('graph.ql');

module.exports = Schema(`
scalar Date

type Character {
    name: String!
    eye_color: String
    gender: String
    homeworld(): Planet
    films(): [Film]
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

# These are the queries available on the server
type Query {
    # find a film by ID
    find_film (id: Int): Film
    # find a Character by ID
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
        },
        films (character, args) {
             return axios.all(character.films.map(url => {
                return axios.get(url).then(res => res.data)
            }));
        }
    },
    Film: {
        producers (film, args) {
            //console.log('film:', film);
            return film.producer.split(/\s*,\s*/);
        },
        characters (film, args) {
            var characters = args.limit ? film.characters.slice(0, args.limit) : film.characters;
            return axios.all(characters.map(url => {
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
