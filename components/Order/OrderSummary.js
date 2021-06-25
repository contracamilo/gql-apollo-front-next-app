import React, { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";
import ProductSummary from "./ProductSummary";

const OrderSummary = () => {
  const { products } = useContext(OrderContext);

  return (
    <div>
      <p className="mt-10 my-2 bg-white border-l-4 border-blue-800 text-gray-600 p-2 text-sm font-bold">
        3. Chose quantities
      </p>
      {products.length ? (
        products.map((product) => (
          <ProductSummary key={product.id} product={product} />
        ))
      ) : (
        <>
          <p className="mt-5 text-sm">product not selected</p>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
