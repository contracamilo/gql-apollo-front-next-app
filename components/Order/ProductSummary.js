/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const ProductSummary = ({ product = {} }) => {
  const [quantity, setQuantity] = useState(0);
  const { name, price } = product;
  const { productQuantity, updateTotal } = useContext(OrderContext);

  useEffect(() => {
    updateQuantity();
  }, [quantity, updateQuantity]);

  useEffect(() => {
    updateTotal();
  }, [quantity]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuantity = () => {
    const newProduct = { ...product, quantity: Number(quantity) };
    productQuantity(newProduct);
  };

  return (
    <div className="flex md:justify-between md:items-center mt-3">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm text-gray-500 ">{name}</p>
        <p className="text-sm font-bold">$ {price}</p>
      </div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        type="number"
        placeholder="price"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
    </div>
  );
};

export default ProductSummary;
