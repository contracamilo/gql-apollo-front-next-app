import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import Layout from "../../components/Layout";
import * as Yup from "yup";
import { GET_CLIENT_BY_ID, UPDATE_CLIENT } from "../../data-access";
import { Formik } from "formik";
import Swal from "sweetalert2";

const EditClient = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data, loading } = useQuery(GET_CLIENT_BY_ID, {
    variables: {
      id: pid,
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const clientInfo = data?.getClientByID;

  const schemaValidations = Yup.object({
    name: Yup.string().required("mandatory field"),
    lastname: Yup.string().required("mandatory field"),
    email: Yup.string().email("Not valid").required("mandatory field"),
    company: Yup.string().required("mandatory field"),
    phone: Yup.string(),
  });

  const handleUpdateClient = async (values) => {
    console.log(values);
    const { name, lastname, email, company, phone } = values;
    try {
      const { data } = await updateClient({
        variables: {
          id: pid,
          input: { name, lastname, email, company, phone },
        },
      });

      Swal.fire("Updated successfully!", `the client was updated`, "success");
      router.push("/");
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
            onSubmit={(values) => handleUpdateClient(values)}
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
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Client Name"
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
                      htmlFor="lastname"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="Client Last Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={props.values?.lastname}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.lastname && props.errors.lastname && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.lastname}</p>
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
                      value={props.values?.company}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.company && props.errors.company && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.company}</p>
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
                      value={props.values?.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.email && props.errors.email && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.email}</p>
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
                      value={props.values?.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.phone && props.errors.phone && (
                      <div className="my-2 bg-red-100 border-l-4 text-sm border-red-500 text-red-700 p-4">
                        <p>{props.errors.phone}</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white rounded hover:bg-blue-500 font-bold"
                    value="Edit client"
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

export default EditClient;
