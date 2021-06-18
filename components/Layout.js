import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "./Header";
import { GET_AUTH_USER } from "../data-access";

const Layout = ({ children }) => {
  const [userId, setUserId] = useState("");
  const { data } = useQuery(GET_AUTH_USER);
  const { pathname, push } = useRouter();

  useEffect(() => {
    setUserId(data?.getAuthUser.id);
  }, [data]);

  return (
    <>
      <Head>
        <title>CRM sales</title>
        <meta name="description" content="GraphQL CRM" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      {pathname === "/login" || pathname === "/signup" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <main className="bg-gray-200">
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header userId={userId} />
              {children}
            </div>
          </div>
        </main>
      )}

      <footer></footer>
    </>
  );
};

export default Layout;
