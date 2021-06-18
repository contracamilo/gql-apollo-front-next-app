import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { GET_USER_CLIENTS } from "../data-access";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const { data, loading, error } = useQuery(GET_USER_CLIENTS);
  const clients = data?.getClientsBySalesPerson;
  const { push } = useRouter();

  if (loading) return "Loading...";

  if (!data) {
    return push("/login");
  }

  return (
    <div>
      <Layout>
        <h1 className="text-xl text-gray-800 font-light">Clients</h1>
        <Link href="/new_client">
          <a className="bg-blue-800 text-white w-full sm:w-auto font-bold  text-sm rounded py-2 px-5 shadow-md inline-block hover:bg-blue-600">
            Add New Client
          </a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="border px-4 py-2">{`${client.name} ${client.lastname}`}</td>
                <td className="border px-4 py-2">{`${client.company}`}</td>
                <td className="border px-4 py-2">{`${client.email}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
