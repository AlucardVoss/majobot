const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js');
const booru = require('booru');

module.exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
	}

        if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                description: "That kind of stuff is not allowed! Not even in NSFW channels!"
            }})
		}

        var query = message.content.split(/\s+/g).slice(1).join(" ");
        booru.search('gelbooru', [query], {nsfw: true, limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.RichEmbed()
                    .setTitle(":smirk: Gelbooru:")
                    .setImage(image.common.file_url)
                    .setColor('RANDOM')
                    .setFooter(`Tags: gelbooru ${query}`)
                    .setURL(image.common.file_url);
                    return message.channel.send({ embed });
                }
            }).catch(err => {
                if (err.name === 'booruError') {
          		return message.channel.send({embed: {
                color: 16734039,
                description: `No results found for: **${query}**`
            }})
                } else {
                return message.channel.send({embed: {
                color: 16734039,
                description: `No results found for: **${query}**`
            }})
                }
})

}

module.exports.help = {
    name: "gelbooru",
    description: "Sends a random gelbooru image/gif",
    usage: "gelbooru",
    type: "NSFW" 
}