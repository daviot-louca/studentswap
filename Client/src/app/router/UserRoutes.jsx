import { Routes, Route } from "react-router-dom";

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<div>StudentSwap User</div>}
      />

      <Route
        path="/login"
        element={<div>Login</div>}
      />

      <Route
        path="/register"
        element={<div>Register</div>}
      />
    </Routes>
  );
}

export default UserRoutes;