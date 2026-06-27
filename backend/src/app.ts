import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.routes';
import { cursoRouter } from './routes/curso.routes';
import { errorHandler } from './middleware/error-handler';

export const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:4200'
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mente-digital-api' });
});

app.use('/auth', authRouter);
app.use('/cursos', cursoRouter);

app.use(errorHandler);
