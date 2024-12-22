// UserList.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', first_name: '', last_name: '', username: '', password: '', is_active: true, is_staff: false, is_verified: false });
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ email: '', first_name: '', last_name: '', username: '', password: '', is_active: true, is_staff: false, is_verified: false });

  const API = "http://localhost:8000/api/users/";
  const token = localStorage.getItem("accessToken");

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Create User
  const handleCreateUser = async () => {
    try {
      const res = await axios.post(API, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, res.data]);
      setNewUser({ email: '', first_name: '', last_name: '', username: '', password: '', is_active: true, is_staff: false, is_verified: false }); // Reset form
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  // Edit User
  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUser({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      password: '', // Do not pre-fill password
      is_active: user.is_active,
      is_staff: user.is_staff,
      is_verified: user.is_verified,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const res = await axios.put(`${API}${editUserId}/`, editUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => (user.id === editUserId ? res.data : user)));
      setEditUserId(null);
      setEditUser({ email: '', first_name: '', last_name: '', username: '', password: '', is_active: true, is_staff: false, is_verified: false }); // Reset form
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h2>Users List</h2>

      {/* Create User */}
      <div>
        <h3>Create User</h3>
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <label>
          Active:
          <input
            type="checkbox"
            checked={newUser.is_active}
            onChange={(e) => setNewUser({ ...newUser, is_active: e.target.checked })}
          />
        </label>
        <label>
          Staff:
          <input
            type="checkbox"
            checked={newUser.is_staff}
            onChange={(e) => setNewUser({ ...newUser, is_staff: e.target.checked })}
          />
        </label>
        <label>
          Verified:
          <input
            type="checkbox"
            checked={newUser.is_verified}
            onChange={(e) => setNewUser({ ...newUser, is_verified: e.target.checked })}
          />
        </label>
        <button onClick={handleCreateUser}>Create</button>
      </div>

      {/* User List */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editUserId === user.id ? (
              <>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editUser.first_name}
                  onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                />
                <input
                  type="text"
                  value={editUser.last_name}
                  onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                />
                <input
                  type="text"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password (leave blank to keep unchanged)"
                  onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                />
                <label>
                  Active:
                  <input
                    type="checkbox"
                    checked={editUser.is_active}
                    onChange={(e) => setEditUser({ ...editUser, is_active: e.target.checked })}
                  />
                </label>
                <label>
                  Staff:
                  <input
                    type="checkbox"
                    checked={editUser.is_staff}
                    onChange={(e) => setEditUser({ ...editUser, is_staff: e.target.checked })}
                  />
                </label>
                <label>
                  Verified:
                  <input
                    type="checkbox"
                    checked={editUser.is_verified}
                    onChange={(e) => setEditUser({ ...editUser, is_verified: e.target.checked })}
                  />
                </label>
                <button onClick={handleUpdateUser}>Save</button>
                <button onClick={() => setEditUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {user.email} - {user.first_name} {user.last_name} (Username: {user.username}, Active: {user.is_active ? 'Yes' : 'No'}, Staff: {user.is_staff ? 'Yes' : 'No'}, Verified: {user.is_verified ? 'Yes' : 'No'})
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
