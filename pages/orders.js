import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { GET_ORDERS_BY_SALESPERSON } from "../data-access";
import { useQuery } from "@apollo/client";
import { Order } from "../components/Order";

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS_BY_SALESPERSON);

  if (loading) return "loading...";

  const orders = data?.getOrdersBySalesPerson;

  return (
    <div>
      <Layout>
        <h1 className="text-xl text-gray-800 font-light">Orders</h1>
        <Link href="/new_order">
          <a className="bg-blue-800 text-white w-full sm:w-auto font-bold  text-sm rounded py-2 px-5 shadow-md inline-block hover:bg-blue-600">
            Create New Order
          </a>
        </Link>

        {orders.length ? (
          orders.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <p className="mt-5 text-center text-2xl">without orders</p>
        )}
      </Layout>
    </div>
  );
};

export default Orders;
