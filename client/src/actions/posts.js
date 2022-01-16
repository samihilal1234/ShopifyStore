import * as api from '../api';

//Action Creators
export const getProducts = () => async (dispatch) => { // async

    try {
        const {data} = await api.fetchProducts();
        dispatch({type : 'FETCH_ALL', payload : data });
    } catch (error) {
        console.log(error.message);
    }

    // const action = {type : 'FETCH_ALL', payload : [] } // action has the type a+ payload

    //dispatch(action);
}

export const createProducts = (product) => async (dispatch) => {
    try {
        const {data} = await api.createProducts(product);

        dispatch ({type: 'CREATE', payload : data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updateProducts = (id, product ) => async (dispatch) => {
    try {
        // const response = await api.updateProducts(id, product); returns response not structured data

        const {data} = await api.updateProducts(id, product); // returns structured data

        dispatch ({type: 'UPDATE', payload : data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProducts = (id) => async (dispatch) => {
    try {
        await api.deleteProducts(id); // returns structured data
        //console.log('ACTIONS DELETE');
        dispatch ({type: 'DELETE', payload : id});

    } catch (error) {
        console.log(error.message);
    }
}


export const getProductsBySearch = (searchQuery) => async (dispatch) => {
    try {
      const { data: { data } } = await api.fetchProductsBySearch(searchQuery);
  
      dispatch({ type: 'FETCH_BY_SEARCH', payload: { data } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
