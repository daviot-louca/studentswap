import { Routes, Route } from "react-router-dom";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import UserLayout from "../../user/layout/UserLayout";
import Home from "../../features/articles/pages/Home";
import ArticleDetail from "../../features/articlesDetails/pages/articleDetail";
import Proposal from "../../features/proposals/pages/Proposals";
import Conversations from "../../features/conversations/pages/Conversations";
import Conversation from "../../features/conversations/pages/Conversation";
import CreationArticle from "../../features/ajoutarticles/CreationArticle";
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
          element={<CreationArticle/>}
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
        <Route
          path="/messages"
          element={<Conversations />}
        />

        <Route
          path="/messages/:id"
          element={<Conversation />}
        />
      </Route>
    </Routes>
  );
}

export default UserRoutes;