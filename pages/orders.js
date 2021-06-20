import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Orders = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-xl text-gray-800 font-light">Orders</h1>
        <Link href="/new_order">
          <a className="bg-blue-800 text-white w-full sm:w-auto font-bold  text-sm rounded py-2 px-5 shadow-md inline-block hover:bg-blue-600">
            Create New Order
          </a>
        </Link>
      </Layout>
    </div>
  );
};

export default Orders;
