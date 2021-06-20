import React from "react";
import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../data-access";
import Link from "next/link";
import Router from "next/router";
import ProductRow from "../components/Product";

const Products = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  if (loading) return "Loading...";

  if (!data) {
    return push("/login");
  }

  const products = data?.getProducts;

  return (
    <div>
      <div>
        <Layout>
          <h1 className="text-xl text-gray-800 font-light">Products</h1>
          <Link href="/new_product">
            <a className="bg-blue-800 text-white w-full sm:w-auto font-bold  text-sm rounded py-2 px-5 shadow-md inline-block hover:bg-blue-600">
              Add New Product
            </a>
          </Link>
          <table className="table-auto shadow-md mt-10 w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">price</th>
                <th className="w-1/5 py-2">stock</th>
                <th className="w-1/5 py-2">Delete</th>
                <th className="w-1/5 py-2">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <ProductRow products={products} />
            </tbody>
          </table>
        </Layout>
      </div>
    </div>
  );
};

export default Products;
