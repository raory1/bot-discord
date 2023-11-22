const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

let kitBau = 400

module.exports = {
    data: new SlashCommandBuilder()
        .setName("venda")
        .setDescription("Gera um formulário para registro de vendas."),

    async execute(interaction){
        try{

        const modal = new ModalBuilder()
        .setCustomId('ModalVendas')
        .setTitle('Registro de Venda');
    
        const idInput = new TextInputBuilder()
            .setCustomId('idInput')
            .setLabel("Digite o passaporte do cliente")
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
        .then((modalInteraction) => {
            const idValue = modalInteraction.fields.getTextInputValue('idInput');
            const qntdValue = modalInteraction.fields.getTextInputValue('qntdInput');

            const exampleEmbed = new EmbedBuilder()
                .setColor(0x960202)
                .setTitle("Novo formulário registrado!")
                .setDescription(`✅ <@${interaction.user.id}> acabou de se registrar!`)
                .setThumbnail(interaction.user.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'ID:', value: `${idValue}`},
                    { name: 'Tinha: ', value: `${kitBau}`, inline: true},
                    { name: 'Tem:', value: `${kitBau-qntdValue}`, inline: true},
                    { name: 'Quantidade vendida: ', value: `${qntdValue}`, inline: true},
                    { name: 'Valor da venda: ', value: `${qntdValue*6}k`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Quem vendeu:', value: `<@${interaction.user.id}>`}
                )
                .setTimestamp()
            modalInteraction.reply({embeds: [exampleEmbed]})
            //estou tentando descobrir como manter a quantidade kit bau girando
        })
        .catch((err) => {
            console.log('Erro');
        });
        
        } catch (error) {
            console.error('Error displaying modal:', error);
        }
    }
}