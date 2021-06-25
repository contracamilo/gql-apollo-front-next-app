import React, { useState, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../data-access";
import OrderContext from "../../context/orders/OrderContext";

const AssignProduct = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const { addProductToOrder } = useContext(OrderContext);

  const handleSelectOption = (option) => {
    addProductToOrder(option);
  };

  if (loading) return "..loading";

  const productData = data?.getProducts;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-blue-800 text-gray-600 p-2 text-sm font-bold">
        2 - Please select the products:{" "}
      </p>
      <Select
        className="mt-3"
        options={productData}
        isMulti
        onChange={(option) => {
          handleSelectOption(option);
        }}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => `${options.name} - ${options.stock} units`}
        placeholder="Select a client"
        noOptionsMessage="no results..."
      />
    </>
  );
};

export default AssignProduct;
