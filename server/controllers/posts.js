import mongoose from 'mongoose';
import ProductMessage from '../models/postMessage.js';

export const getProducts =  async (req, res) => {
    try {
        const postMessages = await ProductMessage.find(); //async action
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

export const createProduct = async (req, res) => {
    const post = req.body;
    //console.log("here");
    const newPost = new ProductMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json( { message : error.message });
    }

}


//posts/1

export const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { price, description, productName, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { productName, price, description, tags, selectedFile, _id: id };

    await ProductMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ProductMessage.findByIdAndRemove(id);

    res.json({message : 'Post deleted succesfully'});

}

export const getProductsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {        
        //console.log("in the backend");
        const productName = new RegExp(searchQuery, "i");

        const posts = await ProductMessage.find({ $or: [ { productName }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}