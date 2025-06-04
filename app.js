import { startDatabase } from "./config/db.js";
import { API_URL } from "./config/variable.js";
import express from "express";
import morgan from "morgan";
import productsRoutes from './routes/products.js';


//creating server
const app = express();
//Parse in json format
app.use(express.json());
app.use(morgan("tiny"));

const PORT = 3000;
startDatabase();

// Mount the product router
app.use(`${API_URL}/products`, productsRoutes);

/* running the server on */
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
