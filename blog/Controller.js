const articleModels = require("../models/articles");
const commentModels = require("../models/comments");
const slugify = require("slugify");
exports.Home = (request, response) => {
    const page = request.query.page || 1;
    const perPage = 10;
    
    let paginate = (page - 1) * perPage;
    let sliceArticles = page * perPage;
    
    articleModels.find({}, (err, articles) => {
        
        let article_count = Math.ceil(articles.length / perPage);
        const article = articles.slice(paginate, sliceArticles);
        response.render("views/Blog", {articles:article, paginate:article_count});
    
    })
}

exports.Article = (request, response) => {
    const title = request.params.articles_title
    articleModels.findOne({title:title}, (err, article) => {
        if(err){
            response.send("404")
        }
        
        commentModels.find({"title":article.title},(err, comments) => {
                response.render("views/Articles",{article:article, comments:comments});
        });
        const total_views = article.total_views + 1;
        articleModels.updateOne({title:title},{total_views:total_views}, (err,res) => {})
    })
}


exports.Search = (request, response) => {
    articleModels.findOne({title:request.query.q}, (err, post)=>{

        if(err){
            response.send("404"); 
        }
        else{
            console.log(post);
            response.render("views/Blog", { articles:post });
        }
        
    });
}

exports.AddComment = (request, response) => {
    const comment = new commentModels({
        comment:request.body.comment,
        sender:request.body.comment_sender,
        title:request.body.title
    });
    comment.save();
    response.redirect("/blog/" + slugify(request.body.title));
}


exports.Top10 = (request, response) => {
    articleModels.find({}).sort([ ["total_views", -1] ]).limit(10).exec((err, articles) => {
        response.render("views/Blog", {articles:articles});
    })
}
