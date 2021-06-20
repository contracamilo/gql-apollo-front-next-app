import React, { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT, GET_PRODUCTS } from "../data-access";
import Router from "next/router";

const ProductRow = ({ products }) => {
  const [productId, setProductId] = useState("");

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter(
            (currentProduct) => currentProduct.id !== productId
          ),
        },
      });
    },
  });

  const deleteProductByID = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result);

      if (result.isConfirmed) {
        try {
          setProductId(id);

          const { data } = await deleteProduct({
            variables: {
              id,
            },
          });

          console.log("data", data);

          Swal.fire("Deleted!", `${data?.deleteProduct}`, "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const editProductByID = (id) => {
    Router.push({
      pathname: "/edit_product/[id]",
      query: {
        id,
      },
    });
  };

  return (
    <>
      {products?.map((product, idx) => (
        <tr key={idx}>
          <td className="border px-4 py-2">{`${product.name}`}</td>
          <td className="border px-4 py-2">{`$ ${product.price}`}</td>
          <td className="border px-4 py-2">{`${product.stock} units`}</td>
          <td className="border px-4 py-2">
            <button
              onClick={() => deleteProductByID(product.id)}
              className="flex justify-center bg-red-800 text-white w-full w-auto font-bold uppercase text-xs rounded py-1 px-4 shadow-md"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </td>
          <td className="border px-4 py-2">
            <button
              onClick={() => editProductByID(product.id)}
              className="flex justify-center bg-green-600 text-white w-full w-auto font-bold uppercase text-xs rounded py-1 px-4 shadow-md"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductRow;
