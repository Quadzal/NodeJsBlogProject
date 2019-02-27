const admin = require("./admin/urls");
const blog = require("./blog/urls");

function urls(app) {
    app.use("/blog", blog);

    app.use("/admin", admin);
}

exports.urls = urls;