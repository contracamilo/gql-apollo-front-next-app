import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const ADD_NEW_ACCOUNT = gql`
  mutation addNewUser($input: UserInput) {
    addNewUser(input: $input) {
      id
      name
      lastname
      email
      createdAt
    }
  }
`;

const SignUp = () => {
  const [message, storeMessage] = useState(null);
  const [addNewUser] = useMutation(ADD_NEW_ACCOUNT);
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("mandatory field"),
      lastName: Yup.string().required("mandatory field"),
      email: Yup.string().email("Not valid").required("mandatory field"),
      password: Yup.string()
        .required("Empty field")
        .min(6, "length must be 6 characters"),
    }),
    onSubmit: async (values) => {
      const { name, lastName, email, password } = values;
      try {
        const { data } = await addNewUser({
          variables: {
            input: {
              name,
              lastname: lastName,
              email,
              password,
            },
          },
        });

        storeMessage(
          `Hey ${data.addNewUser?.name} your account was created successfully!`
        );

        setTimeout(() => {
          storeMessage(null);
          push("/login");
        }, 3000);
      } catch (error) {
        storeMessage(error.message.replace("GraphQl error", ""));

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
      {message && showMessage()}

      <h1 className="text-center text-2xl text-white font-light">
        Create new account
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 py-6"
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
                placeholder="Name"
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
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.lastName}</p>
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
                placeholder="Email"
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
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                  <p>{formik.errors.password}</p>
                </div>
              )}
            </div>
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white rounded hover:bg-blue-500"
              value="Create Account"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
