import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Modal, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "../styles/bills.css";
import { ReactToPrint, useReactToPrint } from "react-to-print";

const Bills = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [popModel, setPopModal] = useState(false);

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

  // handle print fucntions
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (text, record) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedBill(record);
            setPopModal(true);
          }}
        />
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="container">
        <h1 className="text-center mb-4">Invoice List</h1>
        <Table
          columns={columns}
          dataSource={billsData}
          bordered
          className="table-striped"
        />
        {popModel && (
          <Modal
            title={"Invoice Details"}
            open={popModel}
            onCancel={() => {
              setEditItem(null);
              setPopModal(false);
            }}
            footer={false}
          >
            <div id="invoice-POS" ref={componentRef}>
              <center id="top">
                <div className="logo" />
                <div className="info">
                  <h2>CodeRaza POS</h2>
                  <p>Contact:+93114955733 | Nawabshah Sindh</p>
                </div>
              </center>
              <div id="mid">
                <div className="mt-2">
                  <p>
                    Customer Name: <b>{selectedBill.customerName}</b>
                    <br />
                    Phone Number: <b>{selectedBill.customerContact}</b>
                    <br />
                    Date: <b>{selectedBill.date.toString().substring(0, 10)}</b>
                    <br />
                  </p>
                  <hr style={{ margin: "5px" }} />
                </div>
              </div>
              <div className="bot">
                <div className="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle">
                        <td className="item">
                          <h2>Item</h2>
                        </td>
                        <td className="Hours">
                          <h2>QTY</h2>
                        </td>
                        <td className="Rate">
                          <h2>Price</h2>
                        </td>
                        <td className="Rate">
                          <h2>Total</h2>
                        </td>
                      </tr>
                      {selectedBill.cartItems.map((item) => (
                        <>
                          <tr className="service">
                            <td className="tableitem">
                              <p className="itemtext">{item.name}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.quantity}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.price}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">
                                {item.quantity * item.price}
                              </p>
                            </td>
                          </tr>
                        </>
                      ))}

                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h2>Tax</h2>
                        </td>
                        <td className="payment">
                          <h2>{selectedBill.tax}</h2>
                        </td>
                        <td className="Rate">
                          <h2>Grand Total</h2>
                        </td>
                        <td className="payment">
                          <h2>{selectedBill.totalAmount}</h2>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="legalCopy">
                  <p className="legal">
                    <strong>Thank you for order</strong>Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Esse earum quae
                    obcaecati.
                  </p>
                </div>
              </div>
            </div>
            {/* Render detailed invoice information here */}
            {editItem && (
              <div>
                <p>
                  <strong>ID:</strong> {editItem._id}
                </p>
                <p>
                  <strong>Customer Name:</strong> {editItem.customerName}
                </p>
                <p>
                  <strong>Customer Number:</strong> {editItem.customerContact}
                </p>
                <p>
                  <strong>Tax:</strong> {editItem.tax}
                </p>
                <p>
                  <strong>Total Amount:</strong> {editItem.totalAmount}
                </p>
                {/* Add more details as needed */}
              </div>
            )}
            <div className="d-flex justify-content-end">
              <button
                onClick={handlePrint}
                type="primary"
                className="btn btn-primary"
              >
                Print
              </button>
            </div>
          </Modal>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Bills;
