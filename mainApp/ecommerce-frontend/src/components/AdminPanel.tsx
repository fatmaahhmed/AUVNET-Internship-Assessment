import React, { useEffect, useState } from "react";

import axios from "axios";

interface User {
  user_id: number;
  username: string;
  email: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.username} - {user.email}
            <button onClick={() => deleteUser(user.user_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
