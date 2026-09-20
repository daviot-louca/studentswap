import { Routes, Route } from "react-router-dom";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>StudentSwap User</div>} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default UserRoutes;