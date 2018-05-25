const request = require("tinyreq");
module.exports = {
    danbooru: function(tag){
        return new Promise((resolve, reject) => {
        var url = "https://danbooru.donmai.us/posts?page=1&tags=" + tag;
        request(url, (err, body) => {
            if(err){
                console.error(err);
                reject(err);
            }
            else{
                var paginator = body.indexOf("<div class=\"paginator\"");
                var arrow = body.indexOf("</a></li><li class='arrow'>");
                var greaterthan = body.substring(paginator, pages).lastIndexOf(">");
                var pages = body.substring(paginator + greaterthan + 1, pages);

                url = "https://danbooru.donmai.us/posts?page=" + (Math.random() * pages | 0 + 1) + "&tags=" + tag;
    
                request(url, (err, body) => {
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    else{
                        var posts = body.indexOf("<div style=\"overflow: hidden;\">");
                        var articles = body.substring(posts, body.substring(posts).indexOf("</div>") + posts).split("<article");
                        var article = (Math.random() * (articles.length - 1) | 0) + 1;
                        article = articles[article];
                        var imgurl = article.substring(article.indexOf("data-file-url=") + 15);
                        imgurl = imgurl.substring(0, imgurl.indexOf("\""));
                        resolve(imgurl);
                    }
                });
            }
        });
    });
}
}