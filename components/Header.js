import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../data-access";
import { useRouter } from "next/router";

const Header = ({ userId }) => {
  const { push } = useRouter();
  const { loading, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
  });

  const singOut = () => {
    localStorage.removeItem("token");
    push("/login");
  };

  return !loading ? (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola {`${data?.getUserByID?.name} ${data?.getUserByID?.lastname}`}
      </p>
      <button
        onClick={singOut}
        className="bg-blue-800 text-white w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md"
        type="button"
      >
        Sing Out
      </button>
    </div>
  ) : (
    "..."
  );
};

export default Header;
