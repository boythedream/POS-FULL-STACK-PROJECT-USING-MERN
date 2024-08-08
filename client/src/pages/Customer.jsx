import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import axios from "axios";
const Customer = () => {
  const [billsData, setBillsData] = useState([]);
  const getAllItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/bills/get-bills"
      );
      // Ensure data is an array
      if (Array.isArray(data.bills)) {
        setBillsData(data.bills);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getAllItems();
    //eslint-disable-next-line
  }, []);
  /// columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Customer Number",
      dataIndex: "customerContact",
    },
  ];
  return (
    <DefaultLayout>
      <h1>Customer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        className="table-striped"
      />
    </DefaultLayout>
  );
};

export default Customer;
