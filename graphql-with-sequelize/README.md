## GraphQL with Sequelize

Node packages
- `babel-preset-node5` polyfils all ES2015 features that node 5 lacks
- `sequelize` Object relational mapper
- `pg` Postgres driver
- `pg-hstore` H store key store driver
- `lodash`
- `faker` randomly generate names and addresses
- `babel-cli` run babel-node

Running `babel-node db.js` as a stand-alone module
```
relay=>  \d
 public | people        | table    | vlad
 public | people_id_seq | sequence | vlad
 public | posts         | table    | vlad
 public | posts_id_seq  | sequence | vlad
 ```
