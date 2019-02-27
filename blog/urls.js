const express = require("express");
const route = express.Router();
const controller = require("./Controller");

route.get("/", controller.Home);
route.get("/search", controller.Search);
route.get("/:articles_title", controller.Article);
route.get("/top/10", controller.Top10);
route.post("/addComment", controller.AddComment);
module.exports = route;