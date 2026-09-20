import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../user/pages/NotFoundPage"
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
      <Route
      path="/notfound"
      element={NotFoundPage}
      />
    </Routes>
  );
}

export default UserRoutes;