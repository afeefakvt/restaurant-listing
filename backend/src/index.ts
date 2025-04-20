import express,{Application} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import restaurantRoutes from './routes/restaurantRoutes'
import  sequelize  from '../config/db'
import models from '../models'


const app:Application = express()

dotenv.config()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',restaurantRoutes)

sequelize.authenticate()
    .then(()=>{
        console.log("Database connected");
    })
    .catch(err=>{
        console.error("Unable to connect database",err);   
    })

app.get('/',(req,res)=>{
    res.send('hello')
})

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    
})