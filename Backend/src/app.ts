import express, { Request, Response} from 'express';
import cors from 'cors';
import { IProject } from './models/project.interface';
import { v4 as uuid } from 'uuid';

const app = express();
const PORT = 3000;
// List of projects
const projects: IProject[] = [];

// Setup cors and express.json()
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

app.get('/', (_req:Request, res:Response) => {
  res.send('Errgo Backend Interview Module Loaded Successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/projects', (req: any, res: any) => {
  /**
   * TODO: Complete the method for creating a new project
   * The response should contain an object of type IProject
   * 
   * Hint: Utilize the `projects` to store the newly generated of project
   * Hint: Utilize the `uuid` npm package to generate the unique ids for the project
   */
  // res.status(200).json('REPLACE_ME');

  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newProject: IProject = {
    id: uuid(),
    name,
    description
  };

  projects.push(newProject);
  res.status(200).json(newProject);

});

app.get('/projects', (_req:Request, res:Response) => {
  /**
   * TODO: Complete the method for returning the current list of projects
   * The responese should contain a list of IProject
   * 
   * Hint: Utilize the `projects` to retrieve the list of projects
   */
  res.status(200).json(projects);
});