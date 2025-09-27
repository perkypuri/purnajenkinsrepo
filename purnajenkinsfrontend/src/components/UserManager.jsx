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
      {/* Updated CSS */}
      <style>{`
        .user-manager {
          padding: 30px;
          max-width: 700px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .user-manager h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 25px;
          color: #222;
        }

        .user-form {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 30px;
        }

        .user-form input {
          flex: 1 1 200px;
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 10px;
          outline: none;
          font-size: 16px;
          transition: all 0.2s;
        }

        .user-form input:focus {
          border-color: #007bff;
          box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
        }

        .user-form button {
          padding: 12px 20px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
        }

        .user-form button:hover {
          background: #0056b3;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        h3 {
          margin-bottom: 15px;
          font-size: 22px;
          color: #444;
          text-align: center;
        }

        .user-list {
          list-style: none;
          padding: 0;
        }

        .user-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f7f7f7;
          padding: 12px 16px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          transition: all 0.2s;
        }

        .user-list li:hover {
          background: #e9f2ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .user-list li span {
          font-weight: 500;
          font-size: 16px;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #a71d2a;
          transform: translateY(-2px);
          box-shadow: 0 3px 6px rgba(0,0,0,0.1);
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
