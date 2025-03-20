import WishlistModel from "../models/wishlistModel.js";
import UserModel from "../models/user.model.js";  // ✅ Ensure this is imported

// Add to Wishlist
export const addToWishlist = async (request, response) => {
    try {
        const userId = request.userId
        const { productId } = request.body

        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false
            })
        }

        const checkItemWishlist = await WishlistModel.findOne({
            userId: userId,
            productId: productId
        })

        if (checkItemWishlist) {
            return response.status(400).json({
                message: "Item already in wishlist"
            })
        }

        const wishlistItem = new WishlistModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })
        const save = await wishlistItem.save()

        const updateCartUser = await UserModel.updateOne({ _id: userId }, {
            $push: {
                wishlist: productId
            }
        })

        return response.json({
            data: save,
            message: "Item add successfully",
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Remove from Wishlist
export const removeFromWishlist = async (request, response) => {
    try {
        const userId = request.userId // middleware
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }

        // const deleteWishlistItem = await WishlistModel.deleteOne({ _id, userId })
        const deleteWishlistItem = await WishlistModel.deleteOne(
            { userId: userId },
            { $pull: { _id: _id } }, // Remove product from array
            { new: true }
        );

        return response.json({
            message: "Item remove",
            error: false,
            success: true,
            data: deleteWishlistItem
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// Get User Wishlist
export const getWishlist = async (request, response) => {
    try {
        const userId = request.userId;
        // console.log("API Request received for User ID:", userId);

        if (!userId) {
            return response.status(400).json({ message: "User ID is required", error: true });
        }

        const checkItemWishlist = await WishlistModel.find({ userId }).populate("productId");

        // console.log("Wishlist Items in DB:", checkItemWishlist);

        if (!checkItemWishlist || checkItemWishlist.length === 0) {
            return response.json({ data: [], error: false, success: true });
        }

        // ✅ Safely map productId (handle undefined cases)
        const wishlistItems = checkItemWishlist
            .map((item) => item.productId)
            .filter((product) => product !== undefined); // Remove undefined products

        return response.json({
            data: wishlistItems,
            error: false,
            success: true,
        });
    } catch (error) {
        console.error("Backend Error:", error);
        return response.status(500).json({ message: error.message, error: true, success: false });
    }
};

