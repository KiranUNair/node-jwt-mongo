import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { authRouter, userRouter} from './routes/auth.js';

dotenv.config({path: './config/config.env'});
connectDb();

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

//parse https requests where content-type is application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/test', userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
