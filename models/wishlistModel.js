

import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    productId : [{
        type : mongoose.Schema.ObjectId,
        ref : 'product'
    }],
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

const WishlistModel = mongoose.model('Wishlist',wishlistSchema)

export default WishlistModel