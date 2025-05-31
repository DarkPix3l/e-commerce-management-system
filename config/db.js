import mongoose from "mongoose";
import { MONGO_URL } from "./variable.js";

export const startDatabase = async () =>{
   try {
     await mongoose.connect(MONGO_URL);
     console.log("connected");
   } catch (error) {
    console.log("not connectded", error.message);
   }
}