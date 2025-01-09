import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item
 const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });

    try{
        await food.save();
        res.status(201).json({success:true ,message:"food saved successfully"});
    } catch(error){
        console.log(error)
        res.status(400).json({message: "Failed to add food item"})
    }

 }

 // get all food items

 const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({successz:true,data:foods});
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get food items"})
    }

 }

 // remove food item
 const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlinkSync(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food deleted successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to delete food item"})
    }

 }



 export {addFood,listFood , removeFood}