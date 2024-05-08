import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("h1");

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


const Connection = async () => {
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dfjmu3d.mongodb.net/whatsapp?retryWrites=true&w=majority`
    
      try {
       const conn = await mongoose.connect(URL);
       console.log(`Mongodb connected: ${conn.connection.host}`)
       
      } catch (error) {
       console.log(`Error : ${error.message}`);
       process.exit(1);
      }
 
}

export default Connection;
