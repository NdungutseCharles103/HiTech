import React, {useState, useEffect} from "react";
import Nav from "../components/Navbar";
import Filter from '../components/filter'
import { api } from "../components/utilities/one";
import Sort from "../components/sort";
import ProLoader from "../components/Loaders/ProLoader";

const Products = (props) => {
  const [isProLoader, setProLoader] = useState(false);
 const { cartCount, filter,category,payment, setPayment,counts, updateCounts,
   setCategory, setFilter, wishCount, cartDecrement, wishIncrement, wishDecrement,  cartIncrement, setProducts, products } = props;
  const fetchProducts = async () => {
    const data = await fetch("https://hitech1.herokuapp.com/products");
    await data.json();
    console.log(data);
    setProLoader(true);
  };
  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <div className="">
      <Nav cartCount={cartCount} wishCount={wishCount} />
      <Filter  filter={filter} setFilter={setFilter} products={products} category={category} setCategory={setCategory}/>
      <div className="w-full flex items-center justify-center">
        <Sort/>
      </div> 
      {isProLoader? <div className="grid  auto-col grid-cols-6 gap-4">
        { filter.map((product) => (
          <Test  key={product._id} product={product}  setProducts={setProducts} products={products} cartIncrement={cartIncrement}
          cartDecrement={cartDecrement} wishDecrement={wishDecrement} payment={payment} counts={counts} updateCounts={updateCounts}
          wishIncrement={wishIncrement} filter={filter} setFilter={setFilter} setPayment={setPayment} cartCount={cartCount}
          />))}
          </div>: <ProLoader />}
    </div>
  );
};

export default Products;

function Test (props){
  const {product, cartDecrement,
    wishIncrement, filter, setFilter,cartIncrement, wishDecrement} = props;
  const cartHandler = () => {
    setFilter(
      filter.map((pro) => {
        if (pro._id === product._id) {
          return {
            ...pro,
            cart: !pro.cart,
          };
        }
        return pro;
      })
    );
    if (!product.cart) {
      cartIncrement()
      product.cart = true;
      api.put(`/products/${product._id}`, product);
    } else {
      cartDecrement();
      product.cart = false;
      api.put(`/products/${product._id}`, product);
    }
  };
  const wishHandler = () => {
    setFilter(
      filter.map((pro) => {
        if (pro._id === product._id) {
          return {
            ...pro,
            wish: !pro.wish,
          };
        }
        return pro;
      })
    );
    if (!product.wish) {
      wishIncrement();
      product.wish = true;
      api.put(`/products/${product._id}`, product);
    } else {
      wishDecrement();
      product.wish = false;
      api.put(`/products/${product._id}`, product);
    }
  };
  const cartBtnClass = product.cart ? 'bx bx-x added' : 'bx bx-cart-add';
  const cartBtnTitle = product.cart ? "view cart" : "add to cart";
  const wishBtnClass = product.wish ? "bx bx-list-minus added wish" : "bx bx-list-plus";
  const wishBtnTitle = product.wish ? 'remove from wishlist':'add to wishlist'
  return(
    <div
   
className="card text-sm  justify-between  bg-slate-100 cursor-pointer hover:scale-[1.05] duration-300 shadow-xl
mt-3 flex flex-col items-center p-2"
>
<div className="flex h-[65%] items-center flex-col w-full bg-white"><img className="h-full" src={product.image} alt="" /></div>
<p className="py-2 text-center">{product.name}</p>
<div className="acts flex item-center w-[80%] px-2 justify-between">
<button onClick={wishHandler} title={wishBtnTitle}
  className={`flex rbtns p-2 text-3xl bg-slate-300 items-center rounded-full  ${wishBtnClass}`}
>
</button>
<p className='flex items-center'>{product.price}</p>
<button onClick={cartHandler} title={cartBtnTitle}
  className={`flex lbtns text-3xl items-center p-2 ml-2 bg-blue-600 rounded-full ${cartBtnClass}`}
>
</button>
</div>
</div>
  )
}
