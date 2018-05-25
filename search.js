///Returns a Promise for random image on Danbooru from given tag

const request = require("tinyreq");

module.exports = {
    danbooru: function(tag){
        return new Promise((resolve, reject) => {
            var url = "https://danbooru.donmai.us/posts?tags=" + tag;
            request(url, (err, body) => {
                if(err) return reject(err);
                else{
                    console.log(url);
                    if(body.includes("You cannot search for more than 2 tags at a time")){
                        console.log("Too many tags.");
                        return reject(err);
                    }
                    if(body.includes("Nobody here but us chickens!")){
                        console.log("Empty search.");
                        return reject(err);
                    }
                    //Using known strings in html to find number of pages
                    var paginator = body.indexOf("<div class=\"paginator\"");
                    var arrow = body.indexOf("</a></li><li class='arrow'>");
                    var greaterthan = body.substring(paginator, arrow).lastIndexOf(">");
                    var pages = body.substring(paginator + greaterthan + 1, arrow);
                    //Select random page and construct new URL
                    url = "https://danbooru.donmai.us/posts?page=" + (Math.random() * pages | 0 + 1) + "&tags=" + tag;
                    if(isNaN(pages)) pages = 1; //Single page won't have arrow in the same way
                    console.log("pages: " + pages + " | " + url);
                    request(url, (err, body) => {
                        if(err) return reject(err);
                        else{
                            //Using known strings in html to find image direct links
                            var posts = body.indexOf("<div style=\"overflow: hidden;\">");
                            var articles = body.substring(posts, body.substring(posts).indexOf("</div>") + posts).split("<article");
                            var article = (Math.random() * (articles.length - 1) | 0) + 1;
                            article = articles[article];
                            var imgurl = article.substring(article.indexOf("data-file-url=") + 15);
                            imgurl = imgurl.substring(0, imgurl.indexOf("\""));
                            console.log("images: " + (articles.length - 1) + " | " + imgurl);
                            return resolve(imgurl);
                        }
                    });
                }
            });
        });
    },
    explDanbooru: function(tag){
        return this.danbooru("rating%3Ae+" + tag);
    },
    safeDanbooru: function(tag){
        return this.danbooru("rating%3As+" + tag);
    }
}