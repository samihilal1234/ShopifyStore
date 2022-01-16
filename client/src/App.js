import React, {useState, useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid, TextField, Button } from '@material-ui/core';
// use hooks for redux
import {useDispatch} from 'react-redux'
import {useNavigate , useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import {getProducts, getProductsBySearch} from './actions/posts';
// import posts componment and form compnent
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import shopify from './images/Shopify-Logo.jpg';
import useStyles from './styles';


import './index.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();
    const searchQuery = useQuery();
    let navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
    }, [currentId, dispatch]);

    const handleKeypress = (e) => {
        if(e.keyCode === 13) {
            searchProduct();
        }
    }
    
    
    const searchProduct = () => {

        if (search.trim() === "" && tags.length === 0) {
            navigate('/products');
            window.location.reload(true);
        }
        else if (search.trim() || tags) {
          dispatch(getProductsBySearch({ search, tags: tags.join(',') }));
          navigate(`/products/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/products');
        }
    };

    const reload = () => {
        window.location.reload(true);
        navigate('/products');
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        //<Router>
        <Container maxidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit"> 
                <Typography className={classes.heading} onClick={reload} variant="h2" align="center"> My Shopify Store </Typography>
                <img className={classes.img} src={shopify} height="60"/>
            </AppBar>

                <Grow in>
                    <Container maxWidth="xl">
                        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}> 
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId} /* react uses hooks useState to send the id's from the main app to the other components */ />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                    <TextField name="search" variant="outlined" onKeyDown={handleKeypress} label="Search Products" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" /> 
                                    <Button onClick={searchProduct} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                                </AppBar>
                                <Form currentId={currentId} setCurrentId={setCurrentId} />
                                {(!searchQuery && !tags.length)}
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
        </Container>
        //</Router>
    );
};

export default App; 