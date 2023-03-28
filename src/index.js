require('dotenv').config();
const express = require('express');
require('./db/mongoose'); //ensures that the file runs and then the connection to MongoDB is done.
const Task = require('./models/task');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Servidor a correr na porta ${port}`);
})
