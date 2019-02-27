const articles = require("../models/articles");
const comments = require("../models/comments");
const slugify = require("slugify");
exports.AdminViews = (request, response) => {
    response.render("views/AdminViews");
}

exports.ListCommentsViews = (request, response) => {
    comments.find({}, (err, comments) => {
        response.render("views/ListCommentsViews", {comments:comments});
    })
    
}

exports.ListArticlesViews = (request, response) => {
    articles.find({}, (err, articles) => {
        response.render("views/ListArticlesViews", {articles:articles});
    })
    
}

exports.ArticleViews = (request, response) => {
    response.render("views/ArticlesViews");
}

exports.ArticleAdd = (request, response) => {
    if(request.body.content.length < 50){
        response.render("views/ArticlesViews", {contentError:"Content cannot be less than 50 character"})
    }
    else{
        try{
            const article = new articles({
                title:request.body.title,
                content:request.body.content,
                author:"Esatbey",
                slug_title:slugify(request.body.title)
            });
            article.save(err);
            request.files.image.mv("./public/uploads/" + article.title + ".png")
            response.render("views/ArticlesViews", {msg:"Successfully Added Article"});
        }
        catch (err){
                response.render("views/ArticlesViews", {msg:"Dont Successfully Added Article"});
        }
        };
}   
