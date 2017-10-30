## GraphQL with Sequelize

Node packages
- `babel-preset-node5` polyfils all ES2015 features that node 5 lacks
- `sequelize` Object relational mapper
- `pg` Postgres driver
- `pg-hstore` H store key store driver
- `lodash`
- `faker` randomly generate names and addresses
- `babel-cli` run babel-node
- `graphql` works stand-alone
- `react`
- `react-dom`
- `express` - allow us to write a basic server
- `express-graphql` - graphql Middleware
- `graphiql` - IDE for graphql

Running `babel-node db.js` as a stand-alone module
```
relay=>  \d
 public | people        | table    | vlad
 public | people_id_seq | sequence | vlad
 public | posts         | table    | vlad
 public | posts_id_seq  | sequence | vlad
 ```

### Querying with GraphiQL
- `Ctr + Space` for autocomplete
- `Cmd + /` to comment out a block
```
{
  people {
    id
    firstName
    lastName
    email
  }
}
```
