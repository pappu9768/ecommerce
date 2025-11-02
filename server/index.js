import express, { Router } from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './routes/user.routes.js';
import cors from 'cors';
import { userAuthorization } from './middlewares/user.authorization.js';
import { onlyForName } from './controllers/user.controllers.js';

dotenv.config();

const app = express();

// console.log(process.env.CLOUD_NAME,process.env.API_KEY,process.env.API_SECRET_KEY)
//middlewares
app.use(cors({
    origin:' http://localhost:5173'
}))
app.use(express.json());



//routes
app.use('/api/v1/auth',router)
app.use('/api/v1/admin',router);
app.get('/api/username',userAuthorization,onlyForName);
app.use((req, res) => {
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
});




const url = process.env.MONGO_URL;
const connectDb  = async() => {
    try {
        await mongoose.connect(url);
        console.log("Database connected!!")
    } catch (error) {
        console.log(error);
    }
}

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    connectDb()
    console.log(`Server is running on ${port}`);
})