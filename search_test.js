const search = require("./search.js");
search.danbooru(tag)
    .then(imgurl => console.log(imgurl))
    .catch(err => console.error(err));