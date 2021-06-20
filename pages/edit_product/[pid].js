import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import Layout from "../../components/Layout";
import * as Yup from "yup";
import { GET_PRODUCT_BY_ID, UPDATE_PRODUCT } from "../../data-access";
import { Formik } from "formik";
import Swal from "sweetalert2";

const EditProduct = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  console.log(pid);

  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id: pid,
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const clientInfo = data?.getProductByID;

  const schemaValidations = Yup.object({
    name: Yup.string().required("mandatory field"),
    stock: Yup.number().required("mandatory field"),
    price: Yup.number().required("mandatory field"),
  });

  const handleUpdateProduct = async (values) => {
    const { name, stock, price } = values;
    try {
      const { data } = await updateProduct({
        variables: {
          id: pid,
          input: { name, stock, price },
        },
      });

      Swal.fire("Updated successfully!", `the product was updated`, "success");
      router.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return "loading...";
  }

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Edit Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidations}
            enableReinitialize
            initialValues={{ ...clientInfo }}
            onSubmit={(values) => handleUpdateProduct(values)}
          >
            {(props) => {
              return (
                <form
                  onSubmit={props.handleSubmit}
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
                      value={props.values?.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.name && props.errors.name && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="stock"
                    >
                      Stock (units)
                    </label>
                    <input
                      id="stock"
                      type="text"
                      placeholder="Stock"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={props.values?.stock}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.stock && props.errors.stock && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.stock}</p>
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
                      type="text"
                      placeholder="$"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={props.values?.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.price && props.errors.price && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.price}</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white rounded hover:bg-blue-500 font-bold"
                    value="Edit Product"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
