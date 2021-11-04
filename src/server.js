import express from "express";
import cors from "cors";
import { testConnection, connectDB } from "./db/index.js"; //1.
import productsRouter from "./services/products.js";
import {join} from "path"
import dotenv from 'dotenv/config';
import listEndpoints from "express-list-endpoints";
import reviewsRouter from "./services/reviews.js";
import categoryRouter from "./services/category.js";
import usersRouter from "./services/users.js";


const server = express();

const { PORT = 5001 } = process.env;

server.use(cors("*"));


const publicFolderPath = join(process.cwd(), "public");


server.use(express.static(publicFolderPath));
server.use(express.json());
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/category", categoryRouter);
server.use("/users", usersRouter);


console.table(listEndpoints(server))

server.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await testConnection();
  await connectDB();
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});