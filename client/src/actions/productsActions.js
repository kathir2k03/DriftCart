import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'

export const getProducts = (currentPage = 3) => async (dispatch) => {  

    try{
       dispatch(productsRequest())
       const {data} = await axios.get( `/api/v1/products?page=${currentPage}&limit=2`)
       dispatch(productsSuccess(data))
    }  catch (error) {
        dispatch(productsFail(error?.response?.data?.message || error.message))
    }
}

