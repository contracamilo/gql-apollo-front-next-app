import React, { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT, GET_USER_CLIENTS } from "../data-access";
import Router from "next/router";

const ClientRow = ({ clients }) => {
  const [userId, setUserId] = useState("");

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { getClientsBySalesPerson } = cache.readQuery({
        query: GET_USER_CLIENTS,
      });

      cache.writeQuery({
        query: GET_USER_CLIENTS,
        data: {
          getClientsBySalesPerson: getClientsBySalesPerson.filter(
            (currentClient) => currentClient.id !== userId
          ),
        },
      });
    },
  });

  const deleteClientByID = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setUserId(id);

          const { data } = await deleteClient({
            variables: {
              id,
            },
          });

          Swal.fire("Deleted!", `${data?.deleteClient}`, "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const editClientByID = (id) => {
    Router.push({
      pathname: "/edit_client/[id]",
      query: {
        id,
      },
    });
  };

  return (
    <>
      {clients?.map((client, idx) => (
        <tr key={idx}>
          <td className="border px-4 py-2">{`${client.name} ${client.lastname}`}</td>
          <td className="border px-4 py-2">{`${client.company}`}</td>
          <td className="border px-4 py-2">{`${client.email}`}</td>
          <td className="border px-4 py-2">
            <button
              onClick={() => deleteClientByID(client.id)}
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
            {" "}
            <button
              onClick={() => editClientByID(client.id)}
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

export default ClientRow;
