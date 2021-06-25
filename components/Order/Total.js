import React, { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const Total = () => {
  const { total } = useContext(OrderContext);

  console.log("total", total);

  return (
    <div className="flex item-center mt-5 justify-between border rounded bg-white p-3 border-solid 0">
      <h2 className="text-blue-600 text-lg font-bold">Grand Total:</h2>
      <p className="text-gray-800 mt-0">$ {total}</p>
    </div>
  );
};

export default Total;
