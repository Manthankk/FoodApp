import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId).lean();

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cart || {};
        const itemId = req.body.itemId;

        if (!cartData[itemId]) {
            cartData[itemId] = 0;
        }
        cartData[itemId] += 1;

        const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { cart: cartData }, { new: true });

        res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add item to cart" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId).lean();

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cart || {};
        const itemId = req.body.itemId;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

            await userModel.findByIdAndUpdate(req.body.userId, { cart: cartData }, { new: true });
            return res.json({ success: true, message: "Removed from cart" });
        } else {
            return res.status(400).json({ success: false, message: "Item not in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to remove from cart" });
    }
};

// Get user cart (implementation pending)
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId).lean();

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cart || {}; // Access the correct field
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to get user cart" });
    }
};


export { addToCart, removeFromCart, getCart };
