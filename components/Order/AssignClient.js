import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_USER_CLIENTS } from "../../data-access";
import OrderContext from "../../context/orders/OrderContext";

const AssignClient = () => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const { data, loading, error } = useQuery(GET_USER_CLIENTS);
  const { addClientToOrder } = useContext(OrderContext);

  const handleSelectOption = (option) => {
    addClientToOrder(option);
  };

  if (loading) return "..loading";

  const clientsData = data?.getClientsBySalesPerson;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-blue-800 text-gray-600 p-2 text-sm font-bold">
        1 - Please assign a client:{" "}
      </p>
      <Select
        className="mt-3"
        options={clientsData}
        isMulti
        onChange={(option) => {
          handleSelectOption(option);
        }}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.name}
        placeholder="Select a client"
        noOptionsMessage="no results..."
      />
    </>
  );
};

export default AssignClient;
