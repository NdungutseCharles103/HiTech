import React from "react";
import HomeLoader from "./Loaders/HomeLoader";
import Trans from "./Home/Trans";
import Footer from "./Sign/Footer";
import Navbar from "./Navbar";

const Home = (props) => {
  const {
    wishCount,
    wishDecrement,
    cartCount,
    products,
    setFilter,
    category,
    setCategory,
    setProducts,
    wishIncrement,
    cartIncrement,
    cartDecrement,
    isHomeLoader,
    quantity, setQuantity
  } = props;


  return (
    <>
      <div className="main mb-7">
        <Navbar cartCount={cartCount} wishCount={wishCount} />
        {isHomeLoader ? (
          <Trans
            wishCount={wishCount}
            wishDecrement={wishDecrement}
            cartCount={cartCount}
            products={products}
            setFilter={setFilter}
            category={category}
            setCategory={setCategory}
            setProducts={setProducts}
            wishIncrement={wishIncrement}
            cartIncrement={cartIncrement}
            cartDecrement={cartDecrement}
            isHomeLoader={isHomeLoader}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        ) : (
          <HomeLoader />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
