import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountTable = () => {
  const [accountData, setAccountData] = useState([]);
  const token = localStorage.getItem("accessToken"); // Replace with your authentication token if required

  const API_ENDPOINT = "http://localhost:8000/home/accounts";
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(API_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccountData(res.data); // Storing accounts data
        console.log('Accounts-Transactions:', res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err.response?.data || err.message);
      }
    };

    fetchAccounts();
  }, [token]);

  return (
    <div>
      <h1>Account Transactions</h1>
      {accountData.length > 0 ? (
        accountData.map((account) => (
          <div key={account.id}>
            <h2>Account: {account.id}</h2>
            <p>Type: {account.account_type}</p>
            <p>Balance: {account.balance}</p>
            <h3>Transactions From</h3>
            <table border="1">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Account To</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {account.transactions_from.map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>{transaction.transaction_id}</td>
                    <td>{transaction.transaction_date}</td>
                    <td>{transaction.transaction_type || 'N/A'}</td>
                    <td>{transaction.account_to}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Transactions To</h3>
            <table border="1">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Account From</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {account.transactions_to.map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>{transaction.transaction_id}</td>
                    <td>{transaction.transaction_date}</td>
                    <td>{transaction.transaction_type || 'N/A'}</td>
                    <td>{transaction.account_from}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No account data available.</p>
      )}
    </div>
  );
};

export default AccountTable;
