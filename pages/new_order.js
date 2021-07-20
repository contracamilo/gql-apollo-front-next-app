import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import { useMutation } from "@apollo/client";
import AssignClient from "../components/Order/AssignClient";
import AssignProduct from "../components/Order/AssignProducts";
import { NEW_ORDER, GET_ORDERS_BY_SALESPERSON } from "../data-access";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

//context
import OrderContext from "../context/orders/OrderContext";
import OrderSummary from "../components/Order/OrderSummary";
import Total from "../components/Order/Total";

const NewOrder = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const { clients, products, total } = useContext(OrderContext);

  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getOrdersBySalesPerson } = cache.readQuery({
        query: GET_ORDERS_BY_SALESPERSON,
      });

      console.log(getOrdersBySalesPerson);

      cache.writeQuery({
        query: GET_ORDERS_BY_SALESPERSON,
        data: {
          getOrdersBySalesPerson: [...getOrdersBySalesPerson, newOrder],
        },
      });
    },
  });

  const validateOrder = () => {
    const validation = !products.every(
      ((product) => product.quantity > 0) || total === 0 || clients.length === 0
    );

    return validation ? "opacity-50 cursor-not-allowed" : "";
  };

  const createNewOrder = async () => {
    //set productOrder
    const { id } = clients[0];

    const order = products.map(({ stock, __typename, ...product }) => product);

    try {
      await newOrder({
        variables: {
          input: {
            client: id,
            total,
            order,
            status: "PENDING",
          },
        },
      });

      router.push("/orders");

      Swal.fire("Ok", "the order was created correctly!", "success");
    } catch (error) {
      setMessage(error.message.replace("GraphQL error", ""));

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const showMessage = () => {
    return (
      <div className="bg-white py-2px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Create New Order</h1>
      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClient />
          <AssignProduct />
          <OrderSummary />
          <Total />

          <button
            className={`bg-blue-800 w-full mt-5 p-2 text-white font-bold hover:bg-blue-600 ${validateOrder()}`}
            type="button"
            onClick={createNewOrder}
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
