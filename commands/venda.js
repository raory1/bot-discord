const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const db = require('../database/inventory.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("venda")
        .setDescription("Gera um formulário para registro de vendas."),

    async execute(interaction){
        
        const inv = {
            id: 'dx6dGwYfYacRso94HkY9'
        }
        
        try{

            const modal = new ModalBuilder()
            .setCustomId('ModalVendas')
            .setTitle('Registro de Venda');
        
            const idInput = new TextInputBuilder()
                .setCustomId('idInput')
                .setLabel("Digite o ID do cliente")
                .setStyle(TextInputStyle.Short);
            const qntdInput = new TextInputBuilder()
                .setCustomId('qntdInput')
                .setLabel("Digite a quantidade vendida (APENAS NÚMEROS)")
                .setStyle(TextInputStyle.Short);

            const firstActionRow = new ActionRowBuilder().addComponents(idInput);
            const secondActionRow = new ActionRowBuilder().addComponents(qntdInput);
            
            modal.addComponents(firstActionRow, secondActionRow);
            await interaction.showModal(modal)

            const filter = (interaction) => interaction.customId === 'ModalVendas'
            interaction
            .awaitModalSubmit({filter, time: 280_000})
            .then(async (modalInteraction) => {
                const idValue = modalInteraction.fields.getTextInputValue('idInput');
                const qntdValue = modalInteraction.fields.getTextInputValue('qntdInput');
                const estoqueAntigo = await db.findInventory(inv)
                const estoqueNovo = estoqueAntigo - qntdValue
                
                db.updateInventory(inv, estoqueNovo)
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0x960202)
                    .setTitle("Nova venda realizada!")
                    .setThumbnail(interaction.user.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
                    .addFields(
                        { name: 'ID do comprador:', value: `${idValue}`},
                        { name: 'Tinha: ', value: `${estoqueAntigo}`, inline: true},
                        { name: 'Tem:', value: `${estoqueNovo}`, inline: true},
                        { name: 'Quantidade vendida: ', value: `${qntdValue}`, inline: true},
                        { name: 'Valor da venda: ', value: `${qntdValue*6}k`,inline: true},
                    )
                    .setTimestamp()
                modalInteraction.reply({content: `<@${interaction.user.id}> acabou de fazer uma venda!`,embeds: [exampleEmbed]})
            })
            .catch((err) => {
                console.log('Erro');
            });
        
        } catch (error) {
            console.error('Error displaying modal:', error);
        }
    }
}