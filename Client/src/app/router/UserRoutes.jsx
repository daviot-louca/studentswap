import { Routes, Route } from "react-router-dom";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import UserLayout from "../../user/layout/UserLayout";
import Home from "../../features/articles/pages/Home";
import ArticleDetail from "../../features/articlesDetails/pages/articleDetail";
import Proposal from "../../features/proposals/pages/Proposals";

function UserRoutes() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Application utilisateur */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/search"
          element={<div>Recherche</div>}
        />

        <Route
          path="/create"
          element={<div>Publier un article</div>}
        />

        <Route
          path="/messages"
          element={<div>Messages</div>}
        />

        <Route
          path="/profile"
          element={<div>Profil</div>}
        />

        <Route
          path="/articles/:id"
          element={<ArticleDetail />}
        />

        <Route
          path="/articles/:id/proposer"
          element={<Proposal />}
        />
      </Route>
    </Routes>
  );
}

export default UserRoutes;