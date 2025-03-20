import express from "express";
import auth from '../middleware/auth.js'
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";

const wishlistRoutes = express.Router();

wishlistRoutes.post("/add",auth, addToWishlist);
wishlistRoutes.delete("/remove",auth, removeFromWishlist);
wishlistRoutes.get("/get",auth, getWishlist);

export default wishlistRoutes;
