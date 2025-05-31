import { API_URL } from "./config/variable.js";
import { startDatabase } from './config/db.js';
import express from "express";


//creating server
const app = express();
app.use(express.json());


const PORT = 3000;
startDatabase();


app.get(`${API_URL}/products`, (req, res) =>{
    const product ={
        id:1,
        name: 'hair dresser',
        image:'someurl'
    }
    res.send(product);
})

app.post(`${API_URL}/products`, (req, res) =>{
    const newProduct = req.body;
    res.send(newProduct);
    console.log(newProduct);
})


/* running the server on */
app.listen(PORT, ()=> {
    console.log(`server is running at ${PORT}`);
})