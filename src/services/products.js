import express from "express";
import models from "../db/models/index.js"
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
    console.log("THIS IS THE REQUEST BODY", req.body)
    try {
      console.log("THIS IS THE REQUEST BODY", req.body)
      const newProduct = await Product.create(req.body);
      res.send(newProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  productsRouter
  .route("/:id")
  .get(async (req, res, next) => {
    const specificProduct = await Product.findAll({
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(specificProduct)
  });

export default productsRouter;
