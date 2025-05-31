import { API_URL } from "./config/variable.js";
import { startDatabase } from './config/db.js';
import express from "express";

//creating server
const app = express();
app.use(express.json());


const PORT = 3000;
startDatabase();

//we need to have an api and a version in the URL of the route. create that with env.var
//want a public var for API URL wich will be prefixed for every route i use for my app
//http://localhost:3000/api/v1/products
app.get(API_URL+'/products', (req, res) =>{
    res.send('hello API!');
})



/* running the server on */
app.listen(PORT, ()=> {
    console.log(`server is running at ${PORT}`);
})