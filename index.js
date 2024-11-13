import UserRoutes from './Routes/UserRoutes';
import NotesRoutes from './Routes/NotesRoutes';

// configuring the evn variables:
import dotenv from 'dotenv'
dotenv.config();

import connectToMongoDb from './connectToMongodb';
connectToMongoDb();

import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', UserRoutes);
app.use('api/notes', NotesRoutes);

app.listen(port, () => {
    console.log("server running at port :", port);
})