var DataLoader = require('dataloader');
var axios = require('axios');

/*
film.load(<id>)
  then(film_data => console.log(film_data))

film.loadMany([<id>, <id2> <id3>])
  then(films => console.log(films))
create a function that initializes data loader and returns it

Facebook recommends creating new cache per request
*/
module.exports = function (){
  return {
    film: Film(),
    character: Character(),
    planet: Planet()
  }
}

function Film () {
  return new DataLoader(function (ids) {
    console.log(ids);
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/films/${id}/` : id;
      console.log("url "+url);
      return axios.get(url).then(res => res.data).catch(e => {
        console.log(e, ids)

      })
    }))
  })
}

function Character () {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/people/${id}/` : id;
      return axios.get(url).then(res => res.data)
    }))
  })
}

function Planet () {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/planets/${id}/` : id;
      return axios.get(url).then(res => res.data)
    }))
  })
}
/*
var film = Film()
film.load(3)
  .then(data => console.log(data))
  .catch(e => console(e))

film.loadMany([3, 'http://swapi.co/api/films/3'])
    .then(data => console.log(data))
    .catch(e => console.log(e))
*/
