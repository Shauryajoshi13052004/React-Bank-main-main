    import { useEffect, useState } from 'react';
    import axios from 'axios';

    function CustomerList() {
        // State to store customers data, loading state, and error state
        const [customers, setCustomers] = useState([]);
        const [loading, setLoading] = useState(true); // Loading state to manage loading feedback
        const [error, setError] = useState(null); // Error state to manage any fetch errors

        const API = "http://localhost:8000/home/customers/";
        const token = localStorage.getItem("accessToken");

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    // Start loading
                    setLoading(true);
                    const res = await axios.get(API, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // Set customers and stop loading
                    setCustomers(res.data);
                    setLoading(false);
                    console.log(res.data);  // Log to check the response
                } catch (err) {
                    // Handle error and stop loading
                    setError("Error fetching users");
                    setLoading(false);
                    console.error("Error fetching users:", err);
                }
            };

            fetchUsers();
        }, [API, token]);  // Empty dependency array ensures the request is only made once

        // Render loading state or error if necessary
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
            <div>
                <h1>Customer List</h1>
                {customers.length === 0 ? (
                    <p>No customers available.</p>
                ) : (
                    customers.map(customer => (
                        <div key={customer.id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd' }}>
                            <h2>{customer.customer_name}</h2>
                            <p><strong>Contact Info:</strong> {customer.contact_info}</p>

                            <h3>Accounts:</h3>
                            {customer.accounts && customer.accounts.length > 0 ? (
                                customer.accounts.map(account => (
                                    <div key={account.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #f0f0f0' }}>
                                        <p><strong>Account ID:</strong> {account.id}</p>
                                        <p><strong>Account Type:</strong> {account.account_type}</p>
                                        <p><strong>Balance:</strong> {account.balance}</p>

                                        <h4>User Info:</h4>
                                        <p><strong>Username:</strong> {account.user?.username || 'N/A'}</p>
                                        <p><strong>Email:</strong> {account.user?.email || 'N/A'}</p>
                                        <p><strong>First Name:</strong> {account.user?.first_name || 'N/A'}</p>
                                        <p><strong>Last Name:</strong> {account.user?.last_name || 'N/A'}</p>
                                        <p><strong>Is Active:</strong> {account.user?.is_active ? 'Yes' : 'No'}</p>

                                        <h4>Bank Info:</h4>
                                        <p><strong>Bank Name:</strong> {account.bank?.bank_name || 'N/A'}</p>
                                        <p><strong>Location:</strong> {account.bank?.location || 'N/A'}</p>

                                        <h4>Customer Info:</h4>
                                        <p><strong>Customer Name:</strong> {account.customer?.customer_name || 'N/A'}</p>
                                        <p><strong>Customer Contact Info:</strong> {account.customer?.contact_info || 'N/A'}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No accounts available for this customer.</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        );
    }

    export default CustomerList;
