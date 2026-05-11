import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import Loader from "../layouts/Loader";
import Product from "./Product";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'

function ProductSearch() {
  const dispatch = useDispatch();
  const { keyword } = useParams()
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.productsState,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000])
  const [priceChanged, setPriceChanged] = useState(price)
  const [ratings, setRatings] = useState("")
  const catetories = [
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
  const [selectedCategory, setSelectedCategory] = useState("")
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  const selectCategoryHandle = (data) => {
    setSelectedCategory(data)

  }
  useEffect(() => {
    if (error) {
      console.log(error);
      return toast.error(error, {
        // position : toast.POSITION.BOTTOM_CENTER
      });
    }

    dispatch(getProducts(keyword, priceChanged, selectedCategory, ratings, currentPage));
  }, [dispatch, error, currentPage, keyword, priceChanged, selectedCategory, ratings]);

  useEffect(() => {
    if (keyword) {
      setSelectedCategory("")
    }
  }, [keyword])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h2 id="products_heading">Search Products</h2>

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-2">
                {/* Price Filter */}
                <h4 className="mb-3">Filter by Price</h4>
                <div className="px-2" onMouseUp={() => setPriceChanged(price)}>  
                  <Slider
                    range={true}
                    marks={{
                      1: "₹1",
                      100000: "₹100000"
                    }}
                    min={1}
                    max={100000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price)
                    }}
                    handleRender={(node, props) => (
                      <Tooltip
                        overlay={`₹${props.value}`}
                        placement="top"
                        visible={props.dragging}
                      >
                        {node}
                      </Tooltip>
                    )}
                  />
                </div>
                <hr className="mt-5" />

                {/* Category Filter */}
                <div className="mt-3">
                  <div className="mb-3 d-flex">
                    <h4 className="mb-0 pr-3">Categories</h4>
                    {selectedCategory ? 
                    <button
                      onClick={() => selectCategoryHandle("")}
                      className="reset-btn"
                    >
                      ✕ Reset
                    </button> : null                    
                  }

                  </div>
                  <ul className="pl-0">
                    {catetories.map((data) => (
                      <li key={data}
                      className="filter-item"
                        style={{
                          cursor: 'pointer',
                          listStyle: 'none',
                          color: selectedCategory === data ? '#ff9900' : '#000',
                          fontWeight: selectedCategory === data ? 'bold' : 'normal'
                        }}
                        onClick={() => selectCategoryHandle(data)}>{data}</li>
                    ))}
                  </ul>
                </div>
                <hr className="my-2" />

                {/* Ratings Filter */}
                <div className="mt-3">
                  <div className="mb-3 d-flex">
                    <h4 className="mb-0 pr-3">Ratings</h4>
                    {ratings ?              
                    <button
                      onClick={() => setRatings("")}
                      className="reset-btn"
                    >
                      ✕ Reset
                    </button> : null }

                  </div>

                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        key={star}
                        className="filter-item"
                        style={{
                          listStyle: 'none',
                          cursor: 'pointer',
                          padding: '0 10px',
                          marginBottom: '10px',
                          border:
                            ratings === star
                              ? '2px solid #ff9900'
                              : '',
                          borderRadius: '8px',
                          backgroundColor:
                            ratings === star ? '#fff7e6' : '',
                          width: 'fit-content'
                        }}
                        onClick={() => setRatings(star)}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products && products.length > 0 ?
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    )) : <h3>No Data Available</h3>}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && (
            <div className="mt-5">
              <Pagination
                current={currentPage}
                total={productsCount}
                pageSize={2}
                onChange={setCurrentPageNo}
                className="pagination"
                prevIcon={<span>Previous</span>}
                nextIcon={<span>Next</span>}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductSearch;
