import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'

export const getProducts = (keyword, priceChanged, selectedCategory, ratings, currentPage = 1) => async (dispatch) => {  

    let link = `/api/v1/products?page=${currentPage}&limit=2`

    if(keyword && selectedCategory === ""){
       link += `&keyword=${keyword}` 
    }
    if(priceChanged){
       link += `&price[gte]=${priceChanged[0]}&price[lte]=${priceChanged[1]}` 
    }
    if(selectedCategory){
       link += `&category=${selectedCategory}` 
    } 
    if(ratings){
       link += `&ratings=${ratings}` 
    }         
    try{
       dispatch(productsRequest())
       const {data} = await axios.get(link)
       dispatch(productsSuccess(data))
    }  catch (error) {
        dispatch(productsFail(error?.response?.data?.message || error.message))
    }
}

