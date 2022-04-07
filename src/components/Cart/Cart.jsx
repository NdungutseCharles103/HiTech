import React, {useState, useEffect} from "react";
import Nav from "../Navbar";
import { api } from "../utilities/one";

const Cart = (props) => {
  const { cartCount, wishCount} = props;
  const [ onCart, setOnCart] = useState([])
     const fetchProducts = async () => {
       const data = await api.get("/user/cart");
       const products = await data.data;
       console.log(data);
       setOnCart(products);
     };
  
     useEffect(()=>{
       fetchProducts();
     }, [])
  console.log(onCart.length);
  function Test() {
  
    if (onCart.length === 0) {
      return (
        <div className="w-full mt-4 flex items-center justify-center">
          <img
            className="w-[10%]"
            src={require("../../Images/empty.png")}
            alt=""
          />
          <p>The Cart is Empty. Please search for something</p>
        </div>
      );
    } else {
      return (
        <div className="px-[2%] flex flex-col mt-10">
          <h2 className="w-full text-center text font-bold">
            Product currently on your Cart
          </h2>
          <table className="w-full mt-8">
            <thead>
              <tr>
                <th className="w-[15%] bg-yellow-200 h-[40px]">Product</th>
                <th className="w-[15%] bg-yellow-200 h-[40px]">Price</th>
                <th className="w-[15%] bg-yellow-200 h-[40px]">Quantity</th>
                <th className="w-[15%] bg-yellow-200 h-[40px]">Action</th>
              </tr>
            </thead>
            <tbody>
            {onCart.map((c) => (
              <tr key={onCart._id}>
                <td className="flex w-full items-center justify-center flex-col">
                  <div className="flex w-full items-center justify-center flex-col py-2">
                    <img className="w-[90px] mx-auto" src={c.image} alt="" />
                    <p className="w-full text-center">{c.name}</p>
                  </div>
                </td>
                <td>
                  <div className="flex w-full items-center justify-center">
                    <p> {c.price} USD</p>
                  </div>
                </td>
                <td>
                  <div className="flex w-full mx-auto items-center justify-center">
                    <button
                      title="Decrease quantity"
                      className="bg-red-200 px-5"
                    >
                      -
                    </button>
                    <p className="mx-6">3</p>
                    <button
                      title="Increase quantity"
                      className="bg-green-200 px-5"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <div className="flex w-full items-center justify-center">
                    <i
                      title="remove"
                      className=" text-red-500 text-3xl rounded-md px-1 bx bx-x"
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
  return (
    <div>
      <Nav cartCount={cartCount} wishCount={wishCount} />
      <div className="flex justify-center items-center">
        <form className="search bg-slate-100 rounded-3xl mt-4 p-2 flex items-center w-[30%] justify-between pr-4">
          <input
            className="ml-2 w-[90%] outline-none border-none bg-transparent focus:border-sky-100"
            type="text"
            placeholder="Search Products"
          />
          <input type="submit" className="hidden" id="submit" />{" "}
          <label htmlFor="submit">
            <i className="bx bx-search text-xl cursor-pointer mt-2"></i>
          </label>
        </form>
      </div>
      <Test />
    </div>
  );
};

export default Cart;
