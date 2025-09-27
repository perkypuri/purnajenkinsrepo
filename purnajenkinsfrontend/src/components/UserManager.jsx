// src/components/UserManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      setFormData({ name: "", email: "", password: "" });
      fetchUsers();
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
    <div className="user-manager">
      {/* CSS inside component */}
      <style>{`
        .user-manager {
          padding: 20px;
          max-width: 600px;
          margin: 30px auto;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          font-family: Arial, sans-serif;
        }

        .user-manager h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .user-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .user-form input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          outline: none;
        }

        .user-form input:focus {
          border-color: #007bff;
        }

        .user-form button {
          padding: 10px 16px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .user-form button:hover {
          background: #0056b3;
        }

        .user-list {
          list-style: none;
          padding: 0;
        }

        .user-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 10px 12px;
          margin-bottom: 8px;
          border-radius: 6px;
          border: 1px solid #eee;
        }

        .user-list li span {
          font-weight: 500;
          color: #333;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .delete-btn:hover {
          background: #a71d2a;
        }
      `}</style>

      <h2>User Manager</h2>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Users List */}
      <h3>All Users</h3>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id}>
            <span>
              {u.name} ({u.email})
            </span>
            <button onClick={() => handleDelete(u.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManager;
