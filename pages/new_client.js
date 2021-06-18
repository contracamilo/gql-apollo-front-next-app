import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ADD_NEW_CLIENT, GET_USER_CLIENTS } from "../data-access";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NewClient = () => {
  const [message, storeMessage] = useState(null);
  const [addClient] = useMutation(ADD_NEW_CLIENT, {
    update(cache, { data: { addClient } }) {
      const { getClientsBySalesPerson } = cache.readQuery({
        query: GET_USER_CLIENTS,
      });

      cache.writeQuery({
        query: GET_USER_CLIENTS,
        data: {
          getClientsBySalesPerson: [...getClientsBySalesPerson, addClient],
        },
      });
    },
  });

  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      company: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("mandatory field"),
      lastname: Yup.string().required("mandatory field"),
      email: Yup.string().email("Not valid").required("mandatory field"),
      company: Yup.string().required("mandatory field"),
      phone: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await addClient({
          variables: {
            input: { ...values },
          },
        });

        push("/");
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
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Client Name"
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
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Client Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.lastname}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.company && formik.errors.company && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.company}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Client Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.email}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Client phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.phone}</p>
                </div>
              )}
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white rounded hover:bg-blue-500 font-bold"
              value="Add New client"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
