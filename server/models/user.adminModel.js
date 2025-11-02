import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage:{
        type:String,
        required:true,
        
    }
    // },
    // createdBy:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"user",
    //     required:true
    // }
}, { timestamps: true })

const adminModel = new mongoose.model('product', adminSchema);

export default adminModel