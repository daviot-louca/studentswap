// là c'est les relations entre les tables mais je pense que tu connais déjà 
import Region from "./Region.js";
import Ville from "./Ville.js";
import User from "./User.js";
import UserPhoto from "./UserPhoto.js";
import Category from "./Category.js";
import SubCategory from "./SubCategory.js";
import EtatArticle from "./EtatArticle.js";
import Article from "./Article.js";
import Tag from "./Tag.js";
import Favorite from "./Favorite.js";
import Conversation from "./Conversation.js";
import ConversationParticipant from "./ConversationParticipant.js";
import Notification from "./Notification.js";
import Notation from "./Notation.js";
import Report from "./Report.js";
import ArticlePhoto from "./ArticlePhoto.js";
import PropositionTroc from "./PropositionTroc.js";
import Role from "./Role.js";
import Messages from "./messages.js";

// region => ville
Region.hasMany(Ville, {
  foreignKey: "Id_regions",
  as: "villes",
});

Ville.belongsTo(Region, {
  foreignKey: "Id_regions",
  as: "region",
});

//ville => user

Ville.hasMany(User, {
  foreignKey: "Id_villes",
  as: "users",
});

User.belongsTo(Ville, {
  foreignKey: "Id_villes",
  as: "ville",
});

//user=> photos profil
User.hasMany(UserPhoto, {
  foreignKey: "Id_users",
  as: "photos",
});

UserPhoto.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

// category => sous category
Category.hasMany(SubCategory, {
  foreignKey: "Id_categories",
  as: "subCategories",
});

SubCategory.belongsTo(Category, {
  foreignKey: "Id_categories",
  as: "category",
});

// sous category => tag

SubCategory.hasMany(Tag, {
  foreignKey: "Id_subCategories",
  as: "tags",
});

Tag.belongsTo(SubCategory, {
  foreignKey: "Id_subCategories",
  as: "subCategory",
});

//user => article

User.hasMany(Article, {
  foreignKey: "Id_users",
  as: "articles",
});

Article.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

//sous categ => article

SubCategory.hasMany(Article, {
  foreignKey: "Id_subCategories",
  as: "articles",
});

Article.belongsTo(SubCategory, {
  foreignKey: "Id_subCategories",
  as: "subCategory",
});

//etat=> article

EtatArticle.hasMany(Article, {
  foreignKey: "Id_etatArticle",
  as: "articles",
});

Article.belongsTo(EtatArticle, {
  foreignKey: "Id_etatArticle",
  as: "etat",
});

//article => photos des articles
Article.hasMany(ArticlePhoto, {
  foreignKey: "Id_articles",
  as: "photos",
});

ArticlePhoto.belongsTo(Article, {
  foreignKey: "Id_articles",
  as: "article",
});

//user <=> favoris <=> Article

User.hasMany(Favorite, {
  foreignKey: "Id_users",
  as: "favorites",
});

Favorite.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

Article.hasMany(Favorite, {
  foreignKey: "Id_articles",
  as: "favorites",
});

Favorite.belongsTo(Article, {
  foreignKey: "Id_articles",
  as: "article",
});

//toutes les relations pour la messagerie socket

Conversation.hasMany(ConversationParticipant, {
  foreignKey: "Id_conversations",
  as: "participants",
});

ConversationParticipant.belongsTo(Conversation, {
  foreignKey: "Id_conversations",
  as: "conversation",
});

User.hasMany(ConversationParticipant, {
  foreignKey: "Id_users",
  as: "conversationParticipations",
});

ConversationParticipant.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

//users => notif

User.hasMany(Notification, {
  foreignKey: "Id_users",
  as: "notifications",
});

Notification.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

// note des users

User.hasMany(Notation, {
  foreignKey: "Id_users",
  as: "notations",
});

Notation.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

// signalement des users

User.hasMany(Report, {
  foreignKey: "Id_users",
  as: "reports",
});

Report.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});

// pareil pour les articles

Article.hasMany(Report, {
  foreignKey: "Id_articles",
  as: "reports",
});

Report.belongsTo(Article, {
  foreignKey: "Id_articles",
  as: "article",
});

// proposition troc/echange

User.hasMany(PropositionTroc, {
  foreignKey: "Id_users",
  as: "propositionsTroc",
});

PropositionTroc.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});


Article.hasMany(PropositionTroc, {
  foreignKey: "Id_articles",
  as: "propositionsTroc",
});

PropositionTroc.belongsTo(Article, {
  foreignKey: "Id_articles",
  as: "article",
});

//role admin pour nous et user pour les autres 
Role.hasMany(User, {
  foreignKey: "Id_roles",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "Id_roles",
  as: "role",
});
// conversation => messages
Conversation.hasMany(Messages, {
  foreignKey: "Id_conversations",
  as: "messages",
});

Messages.belongsTo(Conversation, {
  foreignKey: "Id_conversations",
  as: "conversation",
});

User.hasMany(Messages, {
  foreignKey: "Id_users",
  as: "messages",
});

Messages.belongsTo(User, {
  foreignKey: "Id_users",
  as: "user",
});
export {
  Region,
  Ville,
  User,
  UserPhoto,
  Category,
  SubCategory,
  EtatArticle,
  Article,
  Tag,
  Messages,
  Favorite,
  Conversation,
  ConversationParticipant,
  Notification,
  Notation,
  Report,
  ArticlePhoto,
  PropositionTroc,
  Role,
};