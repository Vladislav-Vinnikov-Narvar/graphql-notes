
var graphql = require('express-graph.ql')
var Schema = require('./main.js')
var Loader = require('./loader')
var express = require('express')
var app = express()

app.use(function (req, res, next) {
  //reinitialize loader for each request
  req.loader = Loader()
  next()
})

app.post('/query', graphql(Schema))

app.get('/', function(req, res) {
    var film = req.query.film;

    Schema(req.loader)(`
        query find ($film: Int!) {
            film: find_film(id: $film) {
                title
                release_date
                characters (limit:3) {
                    name
                    eye_color
                    homeworld {
                        name
                        population
                    }
                }
            }
        }
    `, {
        film: film
    }).then(function(result) {
        res.send(result)
    })
})

app.listen(5100, function () {
    console.log('listening on port 5100')
})
