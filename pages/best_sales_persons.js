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
import { GET_TOP_SALES_PERSON } from "../data-access";
import { useQuery } from "@apollo/client";

const BestSalesPersons = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(GET_TOP_SALES_PERSON);

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "...loading";

  const salesPersonChartData = [];
  const { getTopSalesPerson } = data;

  getTopSalesPerson.map((salesPerson, index) => {
    return (salesPersonChartData[index] = {
      ...salesPerson.salesPerson[0],
      total: salesPerson.total,
    });
  });

  return (
    <Layout>
      <h1 className="text-xl text-gray-800 font-light">Best Sales Person</h1>

      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={salesPersonChartData}
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

export default BestSalesPersons;
