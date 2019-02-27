const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const express = require("express");

exports.setSettings = function setSettings(app) {
    app.use(fileUpload());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use("/public", express.static(path.join(__dirname, "public")));
    app.set("view engine", "ejs");
    app.set("views", [path.join(__dirname, "/blog"), path.join(__dirname, "/admin")]);
}
