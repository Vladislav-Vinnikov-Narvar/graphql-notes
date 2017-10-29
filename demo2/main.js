var axios = require('axios');
var Schema = require('graph.ql');

module.exports = function (loader) {
return Schema(`
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
          return loader.planet.load(character.homeworld);
        },
        films (character, args) {
          loader.film.loadMany(character.films)
        }
    },
    Film: {
        producers (film, args) {
            //console.log('film:', film);
            return film.producer.split(/\s*,\s*/);
        },
        characters (film, args) {
            var characters = args.limit
              ? film.characters.slice(0, args.limit)
              : film.characters;

            return loader.character.loadMany(characters)
       }
    },
    Planet: {

    },
    Query: {
        find_film (query, args) {
          return loader.film.load(args.id)
        },
        find_character (query, args) {
          return loader.character.load(args.id)
        }
    }
});
}
