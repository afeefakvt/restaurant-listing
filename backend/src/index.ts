import express,{Application} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import restaurantRoutes from './routes/restaurantRoutes'
import  sequelize  from '../config/db'
import '../models'


const app:Application = express()
const port = process.env.PORT

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


app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    
})