const { SlashCommandBuilder } = require("discord.js")
const db = require('../database/inventory.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("atualizar-bau")
        .setDescription("Mostra o ping do bot em relação a API do Discord!")
        .addStringOption(option =>
			option
				.setName('quantidade')
				.setDescription('Nova quantidade total de itens')
                .setRequired(true)),
    async execute(interaction){
        const inv = {
            id: 'dx6dGwYfYacRso94HkY9'
        }
        try{
            console.log(interaction.options.getString('quantidade'))
            const estoqueNovo = parseInt(interaction.options.getString('quantidade'))
            db.updateInventory(inv, estoqueNovo)
            await interaction.reply("***Quantidade atualizada com sucesso!***")
        }
        catch(error){
            console.log("Erro na atualização do banco")
        }
        
    }
}
