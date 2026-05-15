import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";

const ProductDetail = () => {

  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.productState);
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

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProduct(id));
  }, [dispatch, error, id]);

useEffect(() => {

    const cartItem = items.find(
        item => item.product === id
    )

    if(cartItem){
        setQuantity(cartItem.quantity)
    } else {
        setQuantity(1)
    }

}, [id, items])
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
                  value={ product?.stock === 0 ? 0 : quantity}
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
                onClick={() => dispatch(addCartItem(product?._id, quantity))}
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

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetail;
