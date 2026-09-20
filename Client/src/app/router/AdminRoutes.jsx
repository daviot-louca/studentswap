import { Routes, Route } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<div>StudentSwap Admin</div>}
      />

      <Route
        path="/login"
        element={<div>Admin Login</div>}
      />
    </Routes>
  );
}

export default AdminRoutes;