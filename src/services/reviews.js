import express from "express";
import models from "../db/models/index.js"
const { Product, Review } = models;

const reviewsRouter = express.Router();

reviewsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll({ include: Review, order:[['id','ASC']]  });
      res.send(reviews);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    console.log("THIS IS THE REQUEST BODY", req.body)
    try {
      console.log("THIS IS THE REQUEST BODY", req.body)
    //   const addProductKey = await Review.update({ productId:req.params.id }, {
    //     where: {
    //       id:`${req.params.id}`
    //     }
    //   })
      const newReview = await Review.create({...req.body});
      res.send(newReview);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  reviewsRouter
  .route("/:id")
  .get(async (req, res, next) => {
    const specificReview = await Review.findAll({
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(specificReview)
  })
  .put(async (req, res, next) => {
    const updatedReview = await Review.update({ ...req.body}, {
      where: {
        id:`${req.params.id}`
      }
    });
    res.send(updatedReview)
  })
  .delete(async (req, res, next) => {
    try{
    const reviewDeletion = await Review.destroy({
      where: {
        id:req.params.id
      }
    });
    res.send({reviewDeletion})
  } catch (error) {
    console.log(error);
    next(error);
  }
  });

export default reviewsRouter;