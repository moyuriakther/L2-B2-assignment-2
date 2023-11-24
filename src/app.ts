import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/User/user.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//Application routes
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To User Management');
});

export default app;
