import mongoose from "mongoose";

export const startDatabase = async () =>{
   try {
     await mongoose.connect("");
     console.log("connected");
   } catch (error) {
    console.log("not connectded", error.message);
   }
}