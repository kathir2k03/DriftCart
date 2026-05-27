import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'
import { createReviewFail, createReviewRequest, createReviewSuccess, newProductRequest, newProductFail, newProductSuccess, productFail, productRequest, productSuccess, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/productSlice'

export const getProducts = (keyword, priceChanged, selectedCategory, ratings, currentPage = 1) => async (dispatch) => {  

    let link = `/api/v1/products?page=${currentPage}&limit=8`

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

export const getProduct = (id) => async (dispatch) => {  

    try{
       dispatch(productRequest())
       const {data} = await axios.get(`/api/v1/product/${id}`)
       dispatch(productSuccess(data))
    }  catch (error) {
        dispatch(productFail(error?.response?.data?.message || error.message))
    }
}

export const createReview = (reviewData) => async (dispatch) => {  

    try{
       dispatch(createReviewRequest())
       const config = {
         'content-type' : 'application/json'
       }
       const {data} = await axios.put(`/api/v1/review`, reviewData, config)
       dispatch(createReviewSuccess(data))
    }  catch (error) {
        dispatch(createReviewFail(error?.response?.data?.message || error.message))
    }
}

export const getAdminProducts = () => async (dispatch) => {
   try{
      dispatch(adminProductsRequest())
      const { data } = await axios.get(`/api/v1/admin/products`)
      dispatch(adminProductsSuccess(data))
   }
   catch(error){
      dispatch(adminProductsFail(error?.response?.data?.message || error.message))
   }
}

export const createNewProducts = (productData) => async (dispatch) => {
   try{
      dispatch(newProductRequest())
      const { data } = await axios.post(`/api/v1/admin/products/new`, productData)
      dispatch(newProductSuccess(data))
   }
   catch(error){
      dispatch(newProductFail(error?.response?.data?.message || error.message))
   }
}

export const deleteProducts = (id) => async (dispatch) => {
   try {
      dispatch(deleteProductRequest())
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
      dispatch(deleteProductSuccess(data))
   }
   catch(error) {
      dispatch(deleteProductFail(
         error?.response?.data?.message || error.message
      ))
   }
}

export const updateProduct = (id, productData) => async (dispatch) => {
   try{
      dispatch(updateProductRequest())
      const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData)
      dispatch(updateProductSuccess(data))
   }
   catch(error){
      dispatch(updateProductFail(error?.response?.data?.message || error.message))
   }
}

// GET REVIEWS
export const getReviews = (productId) => async (dispatch) => {
    try {

        dispatch(reviewsRequest())

        const { data } =
            await axios.get(`/api/v1/admin/review/${productId}`)

        dispatch(reviewsSuccess(data))

    } catch (error) {

        dispatch(
            reviewsFail(
                error?.response?.data?.message || error.message
            )
        )
    }
}

// DELETE REVIEW
export const deleteReview = (productId, reviewId) => async (dispatch) => {
    try {

        dispatch(deleteReviewRequest())

        await axios.delete(
            `/api/v1/admin/review/${productId}/${reviewId}`
        )

        dispatch(deleteReviewSuccess())

    } catch (error) {

        dispatch(
            deleteReviewFail(
                error?.response?.data?.message || error.message
            )
        )
    }
}