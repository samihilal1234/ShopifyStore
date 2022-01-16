import React, {useState, useEffect} from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import useStyles from './styles'

import { useDispatch } from "react-redux";
import {deleteProducts} from '../../../actions/posts';


const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} price={post.price} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.productName}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => {setCurrentId(post._id)}}><EditIcon fontSize="medium" /></Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `) /*loop over all tags of the post and map them to a #*/ }</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.price}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button className={classes.delete} size="small" color="primary" onClick={() => dispatch(deleteProducts(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        </CardActions>
      </Card>
    );
  };

export default Post;