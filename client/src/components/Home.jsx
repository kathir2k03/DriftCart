import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";
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

    dispatch(getProducts(currentPage));
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
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          <div className="  mt-5">
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
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
