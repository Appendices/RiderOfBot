///Rider of Bot Discord bot for SmokedCheese

const Discord = require("discord.js");
const auth = require("./auth.json");
const search = require("./search.js");

//Initialize Discord Bot
const bot = new Discord.Client();

function menu(){
    var menu = "**~help**\t|\tDisplays the menu\n" +
                "**~succ**\t|\tSucks your dick and calls you gay\n" +
                "**~TRS**\t|\tThe Redstone Scientist\n" +
                "**~lewd**\t[tag]\t|\tLewd search\n" +
                "**~safe**\t[tag]\t|\tSafe seach\n";
                "**~search**\t[tag] [tag]\t|\tAny search\n";
    return menu;
}

//Script started
bot.on("ready", () => {
    console.log("Logged in to: " + bot.guilds.array());
    console.log("as: " + bot.user.username + " | " + bot.user.id);
});

//Message response commands
bot.on("message", message => {
    //Listens for commands starting with ~'
    if(message.content.substring(0, 1) == "~"){
        var args = message.content.substring(1).split(" ");
        var tag = "";
        if(args[1]) tag = args[1];

        switch(args[0].toLowerCase()){
            case "help": //~help
                message.channel.send(menu());
                break;
            case "succ": //~succ
                message.channel.send("*succ* *succ* You gay.");
                break;
            case "trs": //~TRS
                message.channel.send("https://cdn.discordapp.com/attachments/317414323226017796/418452262751305729/trs.jpg");
                break;
            case "trs?": //~TRS?
                message.channel.send("https://locker.ifttt.com/v2/12046472/1524033255062-e35a12156bb07745/478242495-hqoa6ui.jpg?sharing_key=b62df0377d751df02f73502e3d4cc9b5");
                break;
            case "lewd": //~lewd [tag]
                search.explDanbooru(tag)
                    .then(imgurl => message.channel.send(imgurl))
                    .catch(err => message.channel.send("I don't feel so good, Mastah."));
                break;
            case "safe": //~safe [tag]
                search.safeDanbooru(tag)
                    .then(imgurl => message.channel.send(imgurl))
                    .catch(err => message.channel.send("I don't feel so good, Mastah."));
                break;
            case "search": //~search [tag] [tag]
                search.danbooru(tag)
                    .then(imgurl => message.channel.send(imgurl))
                    .catch(err => message.channel.send("I don't feel so good, Mastah."));
                break;
            //Add more commands here
        }
    }
});

bot.login(auth.token);