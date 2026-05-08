import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import connectDB from './config/db.js';

import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();


// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Cookie Parser
app.use(cookieParser());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


// Production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}


// Error Middleware
app.use(notFound);
app.use(errorHandler);


// Start Server
app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);