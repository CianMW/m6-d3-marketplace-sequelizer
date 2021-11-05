import express from "express";
import models from "../db/models/index.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv/config';
const { Product, Review, User, Category, ProductJoinCategory, ShoppingCart } = models;

const ShoppingRouter = express.Router();

ShoppingRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
     
      const cart = await User.findAll({ order:[['id','ASC']],
      where : {id : 1}, include : [{ model:Product, through: { model: ShoppingCart } }]
      });

      res.send(cart)
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
      //need to include userId and productId in the req.body
    console.log("THIS IS THE REQUEST BODY", req.body)
    try {
      const addToCart = await ShoppingCart.create(req.body);
      res.send(addToCart);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  ShoppingRouter
  .route("/:id")
  .get(async (req, res, next) => {
    const specificProduct = await ShoppingCart.findAll({
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(specificProduct)
  })
  .delete(async (req, res, next) => {
    try{
    const productRemoveFromCart = await ShoppingCart.destroy({
      where: {
        id:req.params.id
      }
    });
    res.send({productRemoveFromCart})
  } catch (error) {
    console.log(error);
    next(error);
  }
  });


export default ShoppingRouter;
