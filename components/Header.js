import React, { useState } from "react";
import { useRouter } from "next/router";

const Header = ({ userId = "" }) => {
  const { push } = useRouter();

  const singOut = () => {
    localStorage.removeItem("token");
    push("/login");
  };

  return (
    <div className="sm:flex sm:justify-between mb-6 lg:mb-0">
      <p className="mr-2 mb-5">Hola {`${userId}`}</p>
      <button
        onClick={singOut}
        className="bg-blue-800 text-white w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md"
        type="button"
      >
        Sing Out
      </button>
    </div>
  );
};

export default Header;
