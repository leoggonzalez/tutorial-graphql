import express, { Request, Response } from 'express';
import expressGraphQL from 'express-graphql';
import { schema } from './schema/schema';

const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true,
    schema,
  })
);

app.listen(4000, () => {
  console.log('listening on 4000');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});
