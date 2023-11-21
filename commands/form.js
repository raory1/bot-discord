const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const variavelImportada = require('./registrar.js');

// inside a command, event listener, etc.

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dados")
        .setDescription("Exibe dados (atualmente estáticos) de um formulário."),

    async execute(interaction){
        const userID = interaction.user.id
        const userAvatar = interaction.user.avatarURL({ dynamic: true, format: 'png', size: 1024 });

        const exampleEmbed = new EmbedBuilder()
        .setColor(0x960202)
        .setTitle("Novo formulário registrado!")
        .setDescription(`✅ <@${userID}> acabou de se registrar!`)
        .setThumbnail(userAvatar)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Nome completo:', value: "Fulaninha de Tal"},
            { name: 'Telefone: ', value: '123-444'},
        )
        .setTimestamp()
        .setFooter({ text: 'Todos os direitos reservados', iconURL: 'https://i.imgur.com/dRSdiTf.jpeg' });

        await interaction.reply({embeds: [exampleEmbed]})
        
    }
}
