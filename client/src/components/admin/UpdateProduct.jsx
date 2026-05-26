import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import { clearProductUpdated } from "../../slices/productSlice";
import { clearError } from "../../slices/productsSlice";

const UpdateProduct = () => {
    const {id:productId} = useParams()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState("")
    const [images, setImages] = useState([])
    const [imagesCleared, setImagesCleared] = useState(false)    
    const [imagesPreview, setImagesPreview] = useState([])

    const { loading, isProductUpdated, error, product } = useSelector
    ((state) => state.productState)
    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beaty/Health',
        'Sports'
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()

function onImageChange(e) {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {

                setImagesPreview(oldArray => [
                    ...oldArray,
                    reader.result
                ])

                setImages(oldArray => [
                    ...oldArray,
                    file
                ])
            }
        }

        reader.readAsDataURL(file)
    })

    setImagesCleared(false)
}

    function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("stock", stock)
        formData.append("description", description)
        formData.append("seller", seller)
        formData.append("category", category)
        formData.append("imagesCleared", imagesCleared)
        images.forEach((image) => {
            formData.append("images", image)
        })
        dispatch(updateProduct(productId, formData))
    }

    function clearImagesHandler(){
        setImages([])
        setImagesPreview([])
        setImagesCleared(true)
    }

    useEffect(() => {
        if (isProductUpdated) {
            toast.success("Product Updated Successfully", {
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([])
        }
        if (error) {
            toast.error(error, {
                onOpen: () => { dispatch(clearError()) }
            })
        }
        dispatch(getProduct(productId))
    }, [isProductUpdated, dispatch, error, navigate])

    useEffect(() => {
        if(product?._id){
            setName(product?.name)
            setDescription(product?.description)
            setPrice(product?.price)
            setStock(product?.stock)
            setSeller(product?.seller)
            setCategory(product?.category)

            let images = []
            product.images.forEach((image) => {
                images.push(image.image)
            })
            setImagesPreview(images)
        }
    },[product])

    return (
        <Fragment>
            <MetaData title={'Create New Product'} />
            <div className="row">

                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">

                    <div className="wrapper my-5">
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control"
                                    id="description_field" rows="8"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field"
                                    value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={(e) => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImageChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.length > 0 && <span className="mr-2" onClick={clearImagesHandler} style={{cursor:"pointer"}}>
                                <i className="fa fa-trash"></i></span>}
                                {imagesPreview.map((image) => (
                                    <img src={image} height="52" width="55" key={image} className="mt-3 mr-2" alt={"Image Preview"} />
                                ))}
                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>

                </div>

            </div>

        </Fragment>
    )
}
export default UpdateProduct