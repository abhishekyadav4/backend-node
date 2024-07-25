import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})
const port = process.env.PORT|| 3000

import { app } from './app.js';
import { dbConnection } from './db/conn.js';

dbConnection()
app.listen(port,()=>{
    console.log(`server started \n
        http://localhost:${port}`)
        
})