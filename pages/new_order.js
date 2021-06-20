import React, { useContext } from "react";
import Layout from "../components/Layout";
import { ADD_NEW_PRODUCT } from "../data-access";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import AssignClient from "../components/Order/AssignClient";

//context
import OrderContext from "../context/orders/OrderContext";

const NewProduct = () => {
  const {} = useContext(OrderContext);

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Create New Order</h1>
      <AssignClient />
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg"></div>
      </div>
    </Layout>
  );
};

export default NewProduct;
