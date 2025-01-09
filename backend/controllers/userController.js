import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ sucsess:false,message: "Invalid email" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({sucsess:false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({sucsess:false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.json({success:true,message:'login sucess:)', token });
    } catch (error) {
        return res.status(500).json({sucsess:false, message: "Internal server error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!validator.isLength(name, { min: 2, max: 30 })) {
        return res.status(400).json({sucsess:false, message: "Name must be between 2 and 30 characters" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({sucsess:false, message: "Invalid email" });
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
        return res.status(400).json({ sucsess:false,message: "Password must be between 6 and 20 characters" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({sucsess:false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        

        return res.json({ success:true,message:'registration sucessful',token });
    } catch (error) {
        return res.status(500).json({sucsess:false, message: "Internal server error" });
    }
};

export { loginUser, registerUser };
