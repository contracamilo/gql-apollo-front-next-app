import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <h2 className="text-white text-2xl font-black">CRM clients</h2>

      <nav>
        <ul className="mt-5 list-none">
          <li className={pathname === "/" ? "bg-blue-800 p-3" : "p-3"}>
            <Link href="/">
              <a className="text-white mb-0 block">Clients</a>
            </Link>
          </li>
          <li className={pathname === "/orders" ? "bg-blue-800 p-3" : "p-3"}>
            <Link href="/orders">
              <a className="text-white mb-0 block">Orders</a>
            </Link>
          </li>
          <li className={pathname === "/products" ? "bg-blue-800 p-3" : "p-3"}>
            <Link href="/products">
              <a className="text-white mb-0 block ">Products</a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
