import express from 'express';
import demoRoutes from './routes/demoRoutes';
import frameRoutes from './routes/frameRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/api', demoRoutes);
app.use('/api', frameRoutes);
export { app }
