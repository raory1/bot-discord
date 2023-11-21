const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sugerir")
        .setDescription("Envia uma sugestão")
        .addStringOption(option =>
			option
				.setName('sugestao')
				.setDescription('The thing')
                .setRequired(true)),

    async execute(interaction){
        const userID = interaction.user.id
        try {
            const options = interaction.options
            console.log(options)
            const sugestao = interaction.options.getString('sugestao')
            console.log(sugestao)
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x960202)
            .setTitle("📌 Nova sugestão enviada!")
            .addFields(
                { name: 'Autor(a):', value: `<@${userID}>`},
                { name: 'Sugestão: ', value: `${sugestao}`},
            )
            .setTimestamp()
    
            const message = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });
            message.react('✅')
            message.react('❌')
        } catch (error) {
            console.log("Erro ao processar a sugestão")
        }
        

    }
}
