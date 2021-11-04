import express from "express";
import models from "../db/models/index.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv/config';
const { Product, Review, User, Category } = models;

const usersRouter = express.Router();



usersRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({  order:[['id','ASC']]  });
      res.send(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    console.log("THIS IS THE REQUEST BODY", req.body)
    try {
      const newUser = await User.create(req.body);
      res.send(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  usersRouter
  .route("/:id")
  .get(async (req, res, next) => {
    const specificUser = await User.findAll({
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(specificUser)
  })
  .put(async (req, res, next) => {
    const updatedUser = await User.update({ ...req.body}, {
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(updatedUser)
  })
  .delete(async (req, res, next) => {
    try{
    const UserDeletion = await User.destroy({
      where: {
        id:req.params.id
      }
    });
    res.send({UserDeletion})
  } catch (error) {
    console.log(error);
    next(error);
  }
  });


export default usersRouter;