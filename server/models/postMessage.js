import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    price : String,
    description : String,
    productName : String,
    tags : [String],
    selectedFile : String, 
});

const ProductMessage = mongoose.model('ProductMessage', productSchema);

export default ProductMessage;