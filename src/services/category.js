import express from "express";
import models from "../db/models/index.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv/config';
const { Product, Review, User, Category } = models;

const categoryRouter = express.Router();



categoryRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const categories = await Category.findAll({  order:[['id','ASC']]  });
      res.send(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    console.log("THIS IS THE REQUEST BODY", req.body)
    try {
      const newCategory = await Category.create(req.body);
      res.send(newCategory);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  categoryRouter
  .route("/:id")
  .get(async (req, res, next) => {
    const specificCategory = await Category.findAll({
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(specificCategory)
  })
  .put(async (req, res, next) => {
    const updatedCategory = await Category.update({ ...req.body}, {
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(updatedCategory)
  })
  .delete(async (req, res, next) => {
    try{
    const categoryDeletion = await Category.destroy({
      where: {
        id:req.params.id
      }
    });
    res.send({categoryDeletion})
  } catch (error) {
    console.log(error);
    next(error);
  }
  });


export default categoryRouter;
