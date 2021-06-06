import express from "express";
import { restaurantsCtr } from "./restaurantsCtrl";

const restaurantsRouter = express.Router();

restaurantsRouter.route("/").get(restaurantsCtr);

export default restaurantsRouter;
