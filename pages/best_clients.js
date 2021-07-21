import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Layout from "../components/Layout";
import { GET_TOP_CLIENTS } from "../data-access";
import { useQuery } from "@apollo/client";

const BestClients = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(GET_TOP_CLIENTS);

  if (loading) return "...loading";

  const { getTopClients } = data;

  const clientsChartData = [];

  getTopClients.map((client, index) => {
    return (clientsChartData[index] = {
      ...client.client[0],
      total: client.total,
    });
  });

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Best Clients</h1>

      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={clientsChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182ce" />
      </BarChart>
    </Layout>
  );
};

export default BestClients;
