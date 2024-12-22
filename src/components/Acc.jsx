import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    account_type: "SAVINGS",
    balance: "",
    bank: "",
  });
  const [editAccountId, setEditAccountId] = useState(null);
  const [editAccount, setEditAccount] = useState({
    account_type: "SAVINGS",
    balance: "",
    bank: "",
  });

  const API = "http://localhost:8000/home/accounts/"; // Replace with your API endpoint
  const token = localStorage.getItem("accessToken");

  // Fetch Accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccounts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  // Create Account
  const handleCreateAccount = async () => {
    try {
      const res = await axios.post(API, newAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts([...accounts, res.data]); // Add the new account to the list
      setNewAccount({ account_type: "SAVINGS", balance: "", bank: "" }); // Reset form
    } catch (err) {
      console.error("Error creating account:", err);
    }
  };

  // Edit Account
  const handleEditAccount = (account) => {
    setEditAccountId(account.id);
    setEditAccount({
      account_type: account.account_type,
      balance: account.balance,
      bank: account.bank,
    });
  };

  // Update Account
  const handleUpdateAccount = async () => {
    try {
      const res = await axios.put(`${API}${editAccountId}/`, editAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(accounts.map((acc) => (acc.id === editAccountId ? res.data : acc))); // Update account in the list
      setEditAccountId(null);
      setEditAccount({ account_type: "SAVINGS", balance: "", bank: "" }); // Reset form
    } catch (err) {
      console.error("Error updating account:", err);
    }
  };

  // Delete Account
  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(`${API}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(accounts.filter((acc) => acc.id !== id)); // Remove deleted account from the list
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <div>
      <h2>Accounts List</h2>

      {/* Create Account */}
      <div>
        <h3>Create Account</h3>
        <input
          type="text"
          placeholder="Account Type (e.g., SAVINGS)"
          value={newAccount.account_type}
          onChange={(e) => setNewAccount({ ...newAccount, account_type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Balance"
          value={newAccount.balance}
          onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={newAccount.bank}
          onChange={(e) => setNewAccount({ ...newAccount, bank: e.target.value })}
        />
        <button onClick={handleCreateAccount}>Create</button>
      </div>

      {/* Accounts Table */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Bank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              {editAccountId === account.id ? (
                <>
                  <td>{account.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editAccount.account_type}
                      onChange={(e) => setEditAccount({ ...editAccount, account_type: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editAccount.balance}
                      onChange={(e) => setEditAccount({ ...editAccount, balance: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editAccount.bank}
                      onChange={(e) => setEditAccount({ ...editAccount, bank: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdateAccount}>Save</button>
                    <button onClick={() => setEditAccountId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{account.id}</td>
                  <td>{account.account_type}</td>
                  <td>{account.balance}</td>
                  <td>{account.bank}</td>
                  <td>
                    <button onClick={() => handleEditAccount(account)}>Edit</button>
                    <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
