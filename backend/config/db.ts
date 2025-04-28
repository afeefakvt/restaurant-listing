import { Sequelize } from "sequelize"

const username = process.env.DB_USER || 'postgres';
const password=process.env.DB_PASS || 'postgres';
const database=process.env.DB_NAME || 'restaurants';
const host=process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(database,username,password,{
    host:host,
    dialect:'postgres',
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized: false,
        }
    },
    logging:false,
    define:{
        timestamps:true
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }

})
export default sequelize