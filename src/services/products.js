import express from "express";
import models from "../db/models/index.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv/config';
const { Product, Review, User, Category, ProductJoinCategory } = models;

const productsRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
  },
});


productsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({ order:[['id','ASC']],
      include: [{ model: Category, through: { attributes: [] }}]});
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
  })
  .put(async (req, res, next) => {
    const updatedProduct = await Product.update({ ...req.body}, {
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(updatedProduct)
  })
  .delete(async (req, res, next) => {
    try{
    const productDeletion = await Product.destroy({
      where: {
        id:req.params.id
      }
    });
    res.send({productDeletion})
  } catch (error) {
    console.log(error);
    next(error);
  }
  });

  productsRouter
  .route("/:id/upload")
  .put(multer({ storage: cloudinaryStorage }).single("image"),
  async (req, res, next) => {
    console.log("this is the cloudinary api" , process.env.CLOUDINARY_URL)
    if(req.file) {
      const addFileUrl = await Product.update({ image: req.file.path }, {
        where: {
          id:req.params.id
        }
      });
      res.send(addFileUrl)
    } else {

      console.log(error)
      next(error)
    }
  })


  productsRouter
  .route("/:categoryID/post")
  .post(async (req, res, next) => {
    try {

    // gets the specific category by id

      const newproduct = await Product.create(req.body);
      
      const joinNewProduct = ProductJoinCategory.create({productId: newproduct.id, categoryId: req.params.categoryID})
      res.send(joinNewProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

export default productsRouter;
