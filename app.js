import { startDatabase } from "./config/db.js";
import { API_URL } from "./config/variable.js";
import express from "express";
import morgan from "morgan";
import productsRoutes from './routes/products.js';
import category from './routes/categories.js';
import orderRoutes from './routes/orders.js';

//creating server
const app = express();
//Parse in json format
app.use(express.json());
app.use(morgan("tiny"));

const PORT = 3000;
startDatabase();

// Mount the product router
app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/categories`, category);
app.use(`${API_URL}/orders`, orderRoutes);

/* running the server on */
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
