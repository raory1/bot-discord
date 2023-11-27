const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const db = require('../database/members.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("listar")
        .setDescription("Mostra uma lista de usuários cadastrados")
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('Nome do usuario')),
    async execute(interaction){
        try {
            const membersList = await db.findAll()
            const userID = interaction.options.getUser('user') 
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x960202)
                .setTitle("📌 Lista de usuários")       
            
            membersList.forEach(async (member) => {
                exampleEmbed
                    .addFields({name: '** **', value: `<@${member}>` })
            })

            if(!userID){
                // se não for passado um usuário no comando,
                // atualizar o horário do embed
                    exampleEmbed
                        .setTimestamp()

            } else {  
                // se for passado um usuário no comando,
                // atualizar embed com todos os usuários do banco
                exampleEmbed
                    .addFields({name: '**Último usuário adicionado:**', value: `${userID}` })

                // adicionar o usuário do comando ao banco
                db.addMembers(userID)
            }

            if (interaction.channel && interaction.channel.lastMessage) {
                await interaction.reply({content: "***Lista atualizada com sucesso***", ephemeral: true})
                await interaction.channel.lastMessage.edit({ embeds: [exampleEmbed] });

            } 
            else {
                await interaction.reply({content: "***Lista completa enviada***", ephemeral: true})
                await interaction.channel.send({ embeds: [exampleEmbed], fetchReply: true });
            }            
        
        } catch (error) {
            console.log("Erro ao processar a sugestão")
        }
    }
}