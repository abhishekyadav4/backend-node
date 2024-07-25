import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const dbConnection = async()=>{

  try {
    const res=await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
    console.log(
        "db connected successfully"
    )

  } catch (error) {
    console.log(error)
  }
}

export {dbConnection}