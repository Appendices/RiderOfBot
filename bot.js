///Rider of Bot Discord bot for SmokedCheese

const Discord = require("discord.js");
const auth = require("./auth.json");
const search = require("./search.js");

//Initialize Discord Bot
const bot = new Discord.Client();

//Script started
bot.on("ready", () => {
    console.log("Logged in as: " + bot.user.username + " | " + bot.user.id);
});

//Message response commands
bot.on("message", message => {
    //Listens for commands starting with ~'
    if(message.content.substring(0, 1) == "~"){
        var args = message.content.substring(1).split(" ");

        switch(args[0].toLowerCase()){
            case "help": //~help
                message.channel.send("~succ\n" + 
                                    "~search [tag]\n"+
                                    "~TRS");
                break;
            case "succ": //~succ
                message.channel.send("*succ* *succ* You gay.");
                break;
            case "trs": //~TRS
                message.channel.send("https://cdn.discordapp.com/attachments/317414323226017796/418452262751305729/trs.jpg");
                break;
            case "search": //~search [tag]
                if(args.length < 2){
                    message.channel.send("Search term required, Mastah.");
                    break;
                }
                var tag = args[1]; //combine args into compound tag
                for(i = 2; i < args.length; i++){
                    tag = tag + "+" + args[i];
                }
                search.danbooru(tag)
                    .then(imgurl => message.channel.send(imgurl))
                    .catch(err => {
                        console.error(err);
                        message.channel.send("I don't feel so good, Mastah.");
                    });
                break;
            //Add more commands here
        }
    }
});

bot.login(auth.token);