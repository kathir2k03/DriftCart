import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
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
  const [selectedCategory, setSelectedCategory] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)   // ✅ mobile filter toggle

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

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const selectCategoryHandle = (data) => {
    setSelectedCategory(data)
  }

  useEffect(() => {
    if (error) {
      return toast.error(error);
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

          <section id="products" className="container mt-4">

            {/* MOBILE — Filter toggle button */}
            <div className="d-block d-md-none mb-3">
              <button
                onClick={() => setFiltersOpen(prev => !prev)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#030303',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
              >
                {filtersOpen ? '✕ Hide Filters' : '☰ Show Filters'}
              </button>
            </div>

            <div className="row">

              {/* FILTER SIDEBAR */}
              <div
                className={`col-12 col-md-3 mb-4 ${filtersOpen ? 'd-block' : 'd-none'} d-md-block`}
              >
                <div
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    padding: '16px'
                  }}
                >

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
                      onChange={(price) => setPrice(price)}
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
                    <div className="mb-3 d-flex align-items-center" style={{ gap: '10px' }}>
                      <h4 className="mb-0">Categories</h4>
                      {selectedCategory &&
                        <button
                          onClick={() => selectCategoryHandle("")}
                          className="reset-btn"
                        >
                          ✕ Reset
                        </button>
                      }
                    </div>
                    <ul className="pl-0" style={{ paddingLeft: 0 }}>
                      {catetories.map((data) => (
                        <li
                          key={data}
                          className={`filter-item ${selectedCategory === data ? 'active' : ''}`}
                          style={{
                            cursor: 'pointer',
                            listStyle: 'none',
                            padding: '6px 10px',
                            marginBottom: '4px',
                            borderRadius: '6px',
                            transition: '0.2s',
                            color: selectedCategory === data ? '#ff9900' : '#333',
                            fontWeight: selectedCategory === data ? 'bold' : 'normal'
                          }}
                          onClick={() => selectCategoryHandle(data)}
                        >
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="my-2" />

                  {/* Ratings Filter */}
                  <div className="mt-3">
                    <div className="mb-3 d-flex align-items-center" style={{ gap: '10px' }}>
                      <h4 className="mb-0">Ratings</h4>
                      {ratings &&
                        <button
                          onClick={() => setRatings("")}
                          className="reset-btn"
                        >
                          ✕ Reset
                        </button>
                      }
                    </div>
                    <ul className="pl-0" style={{ paddingLeft: 0 }}>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          key={star}
                          className="filter-item"
                          style={{
                            listStyle: 'none',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            marginBottom: '10px',
                            border: ratings === star ? '2px solid #ff9900' : '1px solid transparent',
                            borderRadius: '8px',
                            backgroundColor: ratings === star ? '#fff7e6' : '',
                            width: 'fit-content',
                            transition: '0.2s'
                          }}
                          onClick={() => setRatings(star)}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{ width: `${star * 20}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* MOBILE — Apply button closes filter panel */}
                  <div className="d-block d-md-none mt-2">
                    <button
                      onClick={() => setFiltersOpen(false)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#cb0c13',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Apply Filters
                    </button>
                  </div>

                </div>
              </div>

              {/* PRODUCTS GRID */}
              <div className="col-12 col-md-9">
                <div className="row">
                  {products && products.length > 0 ?
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))
                    : <h3>No Data Available</h3>
                  }
                </div>
              </div>

            </div>
          </section>

          {productsCount > 0 && (
            <div className="mt-5">
              <Pagination
                current={currentPage}
                total={productsCount}
                pageSize={8}
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