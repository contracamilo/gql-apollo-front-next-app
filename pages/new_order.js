import React, { useContext } from "react";
import Layout from "../components/Layout";
import AssignClient from "../components/Order/AssignClient";
import AssignProduct from "../components/Order/AssignProducts";

//context
import OrderContext from "../context/orders/OrderContext";
import OrderSummary from "../components/Order/OrderSummary";
import Total from "../components/Order/Total";

const NewOrder = () => {
  const { clients, products, total } = useContext(OrderContext);

  const validateOrder = () => {
    const validation = !products.every(
      ((product) => product.quantity > 0) || total === 0 || clients.length === 0
    );

    return validation ? "opacity-50 cursor-not-allowed" : "";
  };

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Create New Order</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClient />
          <AssignProduct />
          <OrderSummary />
          <Total />

          <button
            className={`bg-blue-800 w-full mt-5 p-2 text-white font-bold hover:bg-blue-600 ${validateOrder()}`}
            type="button"
          >
            Create New Order
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg"></div>
      </div>
    </Layout>
  );
};

export default NewOrder;
