import React, {useState} from "react";
import Post from "./Post/post.js";
import {Grid, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';

import useStyles from './styles';

const Posts = ( { setCurrentId } ) => {
    const products = useSelector((state) => state.posts ); // return the products from the reducers index.js
    const classes = useStyles();
    console.log(products);
    return (
        !products.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {products.map((post) => ( //curley for JS
                    <Grid key={post._id} item xs={12} sm={6}> {/* the post will be sent to the post model*/}
                        <Post post={post} setCurrentId={setCurrentId}/> 
                    </Grid>
                ))}

            </Grid>
        )
    )
} 

export default Posts;