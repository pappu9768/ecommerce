import adminModel from "../models/user.adminModel.js";
import { uploadProducts } from "../utils/cloudinary.js";


export const createProductFromAdmin = async (req, res) => {
    try {
        const { productName, price, description, productImage } = req.body;

        if (!productName || !price || !description || productImage) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const filePath = req.file?.path
        console.log(filePath);
        const uploadImage = await uploadProducts(filePath);
        console.log(uploadImage);

        
        const newProducts = new adminModel({
            productName,
            price,
            description,
            productImage:uploadImage.url
        })

        const saveProducts = await newProducts.save();
        return res.status(200).json({
            message: "Product is added successully",
            success: true,
            saveProducts
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, description } = req.body;
        const updatedProduct = await adminModel.findByIdAndUpdate(id, { productName, price, description }, { new: true })

        return res.status(201).json({
            message: "Product updated successfully",
            success: true,
            updatedProduct
        })
    } catch (error) {

    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await adminModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "product removed !!",
            deletedProduct
        })
    } catch (error) {
        return res.status(400).json({
            message: "server error",
            error: error
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {

        const allProducts = await adminModel.find();

        return res.status(200).json({
            message: "here is all products",
            success: true,
            allProducts

        })
    } catch (error) {
        return res.status(400).json({
            message: "Server Error",
            error: error
        })
    }
}

// export const uploadImage = async (req, res) => {
//     try {
//         //getting file path
//         const filePath = req.file.path
//         console.log(filePath)
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: "Error found while sending file path"
//         })
//     }
// }