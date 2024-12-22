import React, { useState, useEffect } from "react";
import Tran_data from "./Tran_data"; // Ensure this component is implemented properly.
import axios from "axios";

function Transactions() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountFrom, setSelectedAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("TRANSFER");
  const [paymentOption, setPaymentOption] = useState("Transfer Now");
  const [time, setTime] = useState("");
  const token = localStorage.getItem("accessToken");

  const API_ACCOUNTS = "http://localhost:8000/home/accounts/"; // API endpoint to fetch accounts
  const API_TRANSACTION = "http://localhost:8000/home/transactions/"; // API endpoint for transactions

  // Fetch accounts from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(API_ACCOUNTS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(res.data); // Storing accounts data
        console.log("Accounts:", res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err.response?.data || err.message);
        alert("Failed to load accounts. Please check your connection or credentials.");
      }
    };

    fetchAccounts();
  }, [token]);

  // Handle transaction submission
  const handleTransfer = async () => {
    if (!amount || (transactionType === "TRANSFER" && (!selectedAccountFrom || !accountTo))) {
      alert("All required fields must be filled.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const payload = {
        transaction_type: transactionType,
        amount: parseFloat(amount),
        ...(transactionType !== "DEPOSIT" && { account_from: selectedAccountFrom }),
        ...(transactionType !== "WITHDRAWAL" && { account_to: accountTo }),
        ...(paymentOption === "Schedule Payment" && { time }),
      };

      const res = await axios.post(API_TRANSACTION, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Transaction successful!");
      console.log("Transaction Response:", res.data);
    } catch (err) {
      console.error("Error creating transaction:", err.response?.data || err.message);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Transactions</h1>

      {/* Transaction Type */}
      <div>
        <label htmlFor="transaction_type">Transaction Type:</label>
        <select
          id="transaction_type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="TRANSFER">Transfer</option>
          <option value="DEPOSIT">Deposit</option>
          <option value="WITHDRAWAL">Withdrawal</option>
        </select>
      </div>

      {/* Sender Account */}
      {transactionType !== "DEPOSIT" && (
        <div>
          <label htmlFor="account_from">From Account:</label>
          <select
            id="account_from"
            value={selectedAccountFrom}
            onChange={(e) => setSelectedAccountFrom(e.target.value)}
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.id} - {account.account_type} - {account.balance} ({account.bank || "No Bank Info"})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Recipient Account */}
      {transactionType !== "WITHDRAWAL" && (
        <div>
          <label htmlFor="account_to">To Account:</label>
          <input
          id="amount"
          type="number"
          value={accountTo}
          min={0}
          onChange={(e) => setAccountTo(e.target.value)}
          placeholder="Enter amount"
        />
        </div>
      )}

      {/* Amount */}
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          min={0}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      {/* Payment Option */}
      <div>
        <label htmlFor="paymentOption">Payment Option:</label>
        <select
          id="paymentOption"
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
        >
          <option value="Transfer Now">Transfer Now</option>
          <option value="Schedule Payment">Schedule Payment</option>
        </select>
      </div>

      {/* Schedule Payment Time */}
      {paymentOption === "Schedule Payment" && (
        <div>
          <label htmlFor="time">Schedule Time (minutes):</label>
          <input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in minutes"
          />
        </div>
      )}

      {/* Transfer Button */}
      <div>
        <button onClick={handleTransfer}>Submit</button>
      </div>

      {/* Recent Transactions */}
      <Tran_data />
    </>
  );
}

export default Transactions;
