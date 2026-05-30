import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Button, Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { Modal } from "react-bootstrap";
import { clearError, clearProduct, clearReviewSubmitted } from '../../slices/productSlice'
import ProductReview from "./ProductReview";

const ProductDetail = () => {

  const { id } = useParams();
  const { product = {}, loading, error, isReviewSubmitted } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState)
  const { items } = useSelector(state => state.cartState)
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1)
  const stock = product?.stock

  const increaseQty = () => {
    if (quantity >= product.stock) return;

    setQuantity(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;

    setQuantity(prev => prev - 1);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("")

  useEffect(() => {

    if (isReviewSubmitted) {
      handleClose()

      toast.success("Review Submitted Successfully", {
        onOpen: () => dispatch(clearReviewSubmitted())
      })
    }

    if (error) {
      toast.error(error, {
        onOpen: () => {
          dispatch(clearError())
        }
      })
    }

    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id))
    }

    return () => {
      dispatch(clearProduct())
    }

  }, [dispatch, id, isReviewSubmitted, error])

  useEffect(() => {

    const cartItem = items.find(
      item => item.product === id
    )

    if (cartItem) {
      setQuantity(cartItem.quantity)
    } else {
      setQuantity(1)
    }

  }, [id, items])

  function reviewHandler() {

    const reviewData = {
      rating,
      comment,
      productId: id
    }

    dispatch(createReview(reviewData))
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Product Detail"} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product?.images &&
                  product?.images.map((data) => (
                    <Carousel.Item key={data?._id}>
                      <img
                        src={data?.image}
                        alt={product?.name}
                        height="500"
                        width="500"
                        className="d-block w-100"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product?.name}</h3>
              <p id="product_id">Product #{product?._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product?.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{product?.numOfReviews}</span>

              <hr />

              <p id="product_price">₹{product?.price}</p>

              <div className="stockCounter d-inline">
                <span
                  className="btn btn-danger minus"
                  onClick={decreaseQty}
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={product?.stock === 0 ? 0 : quantity}
                  readOnly
                />

                <span
                  className="btn btn-primary plus"
                  onClick={increaseQty}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                style={{
                  cursor: product?.stock == 0 ? "not-allowed" : "pointer"
                }}
                onClick={() => {
                  dispatch(addCartItem(product?._id, quantity))
                  toast.success('Cart Items Added')
                }}
                disabled={product?.stock == 0 ? true : false}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  className={
                    product?.stock > 0 ? "greenColor" : "redColor"
                  }
                  id="stock_status"
                >
                  {product?.stock > 0 ? "In Stock" : "Out of Stock"}{" "}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product?.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product?.seller}</strong>
              </p>
              {user ?
              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={handleShow}
              >
                Submit Your Review
              </button>
              : <div className="alert alert-danger mt-5">Login to Post Review</div> }


              <div className="row mt-0 mt-md-2 mb-0 mb-md-5">
                <div className="rating w-50">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Submit Review</Modal.Title>

                      <span
                        onClick={handleClose}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          fontWeight: "bold"
                        }}
                      >
                        &times;
                      </span>
                    </Modal.Header>
                    <Modal.Body>
                      <ul className="stars">
                        {
                          [1, 2, 3, 4, 5].map((star, index) => (
                            <li key={index} className={`star ${star <= rating ? 'orange' : ''}`} value={star} onClick={() => setRating(star)}
                              onMouseOver={(e) => e.target.classList.add('yellow')}
                              onMouseOut={(e) => e.target.classList.remove('yellow')}
                            ><i className="fa fa-star"></i></li>
                          ))
                        }
                      </ul>
                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button disabled={loading} onClick={reviewHandler} aria-label="close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
                    </Modal.Body>

                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 ? 
            <ProductReview reviews={product.reviews}/> : null       
        }
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetail;
