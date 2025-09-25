// src/components/UserManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // import backend URL

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/user/viewall`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.BASE_URL}/user/add`, formData);
      setFormData({ name: "", email: "", password: "" }); // reset form
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.BASE_URL}/user/delete/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>User Manager</h2>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add User</button>
      </form>

      {/* Users List */}
      <h3>All Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ marginBottom: "8px" }}>
            {u.name} ({u.email}){" "}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManager;
