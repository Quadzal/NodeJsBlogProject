const express = require("express");
const route = express.Router();
const controller = require("./Controller");


route.get("/", controller.AdminViews);
route.get("/list/comments", controller.ListCommentsViews);
route.get("/list/articles", controller.ListArticlesViews);
route.get("/article/add", controller.ArticleViews);
route.post("/article/add", controller.ArticleAdd);

module.exports = route;