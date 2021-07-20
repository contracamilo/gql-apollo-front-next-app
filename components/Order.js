import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDERS_BY_SALESPERSON,
} from "../data-access";
import Swal from "sweetalert2";

export const Order = ({ order }) => {
  const {
    id,
    total,
    client: { name, lastname, email, phone },
    status,
    client,
  } = order;

  const [orderStatus, setOrderStatus] = useState(status);
  const [statusClass, setStatusClass] = useState("");

  const [updateOrder] = useMutation(UPDATE_ORDER, {});
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersBySalesPerson } = cache.readQuery({
        query: GET_ORDERS_BY_SALESPERSON,
      });

      cache.writeQuery({
        query: GET_ORDERS_BY_SALESPERSON,
        data: {
          getOrdersBySalesPerson: getOrdersBySalesPerson.filter(
            (order) => order.id !== id
          ),
        },
      });
    },
  });

  useEffect(() => {
    if (orderStatus) {
      setOrderStatus(status);
    }

    modifyStatus(orderStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStatus]);

  const modifyStatus = (statusOrder) => {
    switch (statusOrder) {
      case "PENDING":
        setStatusClass("border-yellow-500");
        break;
      case "COMPLETED":
        setStatusClass("border-green-500");
        break;
      case "CANCELLED":
        setStatusClass("border-red-800");
        break;
      default:
        break;
    }
  };

  const changeOrderStatus = async (value) => {
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            status: value,
            client: client?.id,
          },
        },
      });

      setOrderStatus(data?.updateOrder.status);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrderAction = async () => {
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
          const { data } = await deleteOrder({
            variables: {
              id,
            },
          });

          Swal.fire("Deleted!", `${data?.deleteOrder}`, "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div
      className={`${statusClass} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Client: {name} {lastname}
          {email && (
            <p className="flex item-center my-2">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              {email}
            </p>
          )}
          {phone && (
            <p className="flex item-center my-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
              {phone}
            </p>
          )}
        </p>
        <h2 className="text-gray-800 font-bold mt-10">Order Status {status}</h2>
        <select
          className="font-bold mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 uppercase text-xs"
          value={orderStatus}
          onChange={(e) => changeOrderStatus(e.target.value)}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-10">Order Summary</h2>
        {order?.order.map((article, idx) => {
          return (
            <div key={idx} className="mt-4 ">
              <p className="text-sm text-gray-600 ">Product: {article?.name}</p>
              <p className="text-sm text-gray-600 ">
                Quantity: {article?.quantity}
              </p>
            </div>
          );
        })}

        <p className="text-gray-800 mt-3 font-bold">
          Order Total:
          <span className="font-light text-2xl"> $ {total}</span>
        </p>

        <button
          className="flex items-center justify-center mt-5 bg-red-800 text-white w-full w-auto font-bold uppercase text-xs rounded py-2 px-5 shadow-md"
          type="button"
          onClick={() => deleteOrderAction(id)}
        >
          Delete Order
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
      </div>
    </div>
  );
};
