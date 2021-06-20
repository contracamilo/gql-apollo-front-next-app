import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ADD_NEW_PRODUCT, GET_PRODUCTS } from "../data-access";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NewProduct = () => {
  const [message, storeMessage] = useState(null);
  const [addNewProduct] = useMutation(ADD_NEW_PRODUCT, {
    update(cache, { data: { addNewProduct } }) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, addNewProduct],
        },
      });
    },
  });

  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("mandatory field"),
      stock: Yup.number().required("mandatory field"),
      price: Yup.number().required("mandatory field"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await addNewProduct({
          variables: {
            input: { ...values },
          },
        });

        push("/products");
      } catch (error) {
        storeMessage(error.message.replace("GraphQl error", ""));
        console.error(error);

        setTimeout(() => {
          storeMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Client</h1>
      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-m px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Product
              </label>
              <input
                id="name"
                type="text"
                placeholder="Product Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.name}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                id="stock"
                type="number"
                placeholder="Stock (units)"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.stock && formik.errors.stock && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.stock}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="$"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.price}</p>
                </div>
              )}
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white rounded hover:bg-blue-500 font-bold"
              value="Add New Product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
