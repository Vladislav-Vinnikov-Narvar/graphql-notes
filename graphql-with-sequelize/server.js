import Express from 'express';
import GraphHTTP from 'express-graphql'
import Schema from './schema';


const APP_PORT = 5100;

const app = Express();
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,//human readable
  graphiql: true
}));

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
})
