import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.productsState,
  );
  const [currentPage, setCurrentPage] = useState(1);
const isMobile = window.innerWidth < 768;
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      return toast.error(error, {
        // position : toast.POSITION.BOTTOM_CENTER
      });
    }

    dispatch(getProducts(null, null, null, null, currentPage));
  }, [dispatch, error, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.length > 0 ?
                products.map((product) => (
                  <Product col={3} key={product._id} product={product} />
                )) : <h3>No Data Available</h3>}
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
                showLessItems={isMobile}
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

export default Home;
