import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'

export const getProducts = (keyword, currentPage = 1) => async (dispatch) => {  

    let link = `/api/v1/products?page=${currentPage}&limit=2`

    if(keyword){
       link += `&keyword=${keyword}` 
    }
    try{
       dispatch(productsRequest())
       const {data} = await axios.get(link)
       dispatch(productsSuccess(data))
    }  catch (error) {
        dispatch(productsFail(error?.response?.data?.message || error.message))
    }
}

