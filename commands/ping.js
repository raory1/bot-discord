const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Mostra o ping do bot em relação a API do Discord!"),

    async execute(interaction){
        await interaction.reply("Pong")
    }
}
