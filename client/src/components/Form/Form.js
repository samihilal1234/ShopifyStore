import React, {useEffect, useState} from "react";
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch , useSelector} from "react-redux";

import useStyles from './styles';
import {createProducts, updateProducts} from '../../actions/posts';

const Form = ( {currentId, setCurrentId} ) => {
    const [productData, setProductData] = useState({ // empty object we will use to store the data
        productName : '',
        price : '',
        description : '',
        tags : '',
        selectedFile : ''
    });
    
    // if we have a currentId then we will fund the product that has that id else return null
    const product = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null );
    
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(product) setProductData(product);
    }, [product]); // when the product value changes 

    const clear = () => { // arrow function to handle submit
        setCurrentId(0); 
        setProductData({ productName : '', price : '', description : '', tags : '', selectedFile : '' });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createProducts(productData));
          clear();
        } else {
          dispatch(updateProducts(currentId, productData));
          clear();
        }
    };

    


    return (
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Editing "${product.productName}"` : 'Create a Product'}</Typography>
            <TextField name="productName" variant="outlined" label="Product Name" fullWidth value={productData.productName} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
            <TextField name="price" variant="outlined" label="Price" fullWidth value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
            <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={productData.tags} onChange={(e) => setProductData({ ...productData, tags: e.target.value.split(',') })} />
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
    );
}; 

export default Form;