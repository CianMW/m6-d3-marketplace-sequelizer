import express from "express";
import models from "../db/models/index.js";
const { Product, Review } = models;

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({ include: Review });
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newProduct = await Product.create(req.body);
      res.send(newProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default productsRouter;