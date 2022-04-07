import axios from "axios";

export const api = axios.create({
  baseURL: `https://hitech1.herokuapp.com`,
});

export const Products = async () => {
  const get = await api.get("/products");
  const res = await get.data;
  return res;
};

export const payHandler = (fun, con, op) => {
  if (op === "+") {
    return fun((p) => p + con);
  }else{
    return fun((p) => p - con);
  }
};

export const PriceHandler = () => {};
