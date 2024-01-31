import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { register, login, getUser } from './controllers/UserController.js';
import { authValidator } from './helpers/validators.js';
import handleValidationError from './middlewares/handleValidationError.js';
import isAuthenticated from './middlewares/isAuthenticated.js';

dotenv.config()

mongoose.connect(process.env.MONGO_DB_URI)
   .then(() => console.log('Connected to MongoDB'))
   .catch((error) => console.log(error))

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', authValidator, handleValidationError, register)
app.post('/login', authValidator, handleValidationError, login)
app.get('/user', isAuthenticated, getUser)

const PORT = process.env.PORT || 8888

app.listen(PORT, (error) => {
   if (error) {
      return console.log(error)
   }

   console.log(`Server is running on port ${PORT}`)
})