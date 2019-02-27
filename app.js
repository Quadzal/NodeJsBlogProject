const express = require("express"); // import exress
const app = express(); // instance with express
const urlsManager = require("./urls"); // import url manager
const settings = require("./settings");
require("./models/db_connect"); // database connected

settings.setSettings(app);
urlsManager.urls(app); // urlsmanager actived

app.listen(9000, (err) => {
    console.log("Server Listen: http://localhost:9000/");
    console.log("Database is: blog");
});