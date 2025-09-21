import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/user").then((res) => setUser(res.data));
  }, []);

  const handleLogout = async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, Selamat Datang di Dashboard 🎉, {user.name}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

