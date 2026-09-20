import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };