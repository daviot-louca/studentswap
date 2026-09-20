import { Router } from "express";
import auth from "../modules/auth/auth.routes.js";
import user from "../modules/users/users.routes.js"
import categories from "../modules/categories/categories.routes.js"
import subCategories from "../modules/subCategories/subCategories.routes.js"
import EtatArticle from "../modules/etatArticle/etatArticle.routes.js";
import article from "../modules/article/article.routes.js"
import tags from "../modules/tags/tags.routes.js"
import articlePhoto from "../modules/articlePhoto/articlePhoto.routes.js";
import favories from "../modules/favoris/fav.routes.js"
import propositionTroc from "../modules/propositionTroc/propositionTroc.routes.js";
import userPhoto from "../modules/userPhotos/userPhotos.routes.js";
import regions from "../modules/regions/regions.routes.js"
import villes from "../modules/villes/villes.routes.js"
import roles from "../modules/roles/roles.routes.js"
import conversations from "../modules/conversations/conversations.routes.js";
import reports from "../modules/reports/reports.routes.js";
import notifications from "../modules/notifications/notifications.routes.js";
import notations from "../modules/notations/notations.routes.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudentSwap API",
  });
});

router.use("/auth", auth);
router.use("/users",user);
router.use("/userPhotos",userPhoto)
router.use("/categories",categories)
router.use("/subCategories",subCategories)
router.use("/etatArticle",EtatArticle)
router.use("/articles",article)
router.use("/tags",tags)
router.use("/articlePhoto",articlePhoto)
router.use("/favories",favories)
router.use("/propositionTroc",propositionTroc)
router.use("/regions",regions)
router.use("/villes",villes)
router.use("/roles",roles)
router.use("/conversations", conversations);
router.use("/reports", reports);
router.use("/notifications",notifications)
router.use("/notations",notations)
export default router;