import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("accessToken"); // Authentication token

  const API_ENDPOINT = "http://localhost:8000/home/customers"; // Replace with your API endpoint

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(response.data);
        console.log("Customer Data:", response.data);
      } catch (error) {
        console.error("Error fetching customers data:", error.response?.data || error.message);
      }
    };

    fetchCustomersData();
  }, [token]);

  return (
    <div>
      <h2>Customer Accounts</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Contact Info</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Address</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>User Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Accounts</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.customer_name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.contact_info}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.address}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.user.email}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                    <th style={{ border: "1px solid #ddd", padding: "4px" }}>Account ID</th>
                      <th style={{ border: "1px solid #ddd", padding: "4px" }}>Account Type</th>
                      <th style={{ border: "1px solid #ddd", padding: "4px" }}>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.accounts.map((account) => (
                      <tr key={account.id}>
                        <td style={{ border: "1px solid #ddd", padding: "4px" }}>
                          {account.id}
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "4px" }}>
                          {account.account_type}
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "4px" }}>
                          {account.balance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;
