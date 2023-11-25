const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("registrar")
        .setDescription("Abre um formulário de registro."),
        
    async execute(interaction){
        try{

        const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('Registro');
    
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel("Digite seu nome e sobrenome")
            .setStyle(TextInputStyle.Short);
        const idInput = new TextInputBuilder()
            .setCustomId('idInput')
            .setLabel("Digite seu ID")
            .setStyle(TextInputStyle.Short);
        const telInput = new TextInputBuilder()
            .setCustomId('telInput')
            .setLabel("Digite seu telefone")
            .setPlaceholder("xxx-xxx")
            .setStyle(TextInputStyle.Short);
        const ageInput = new TextInputBuilder()
            .setCustomId('ageInput')
            .setLabel("Digite sua idade")
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(idInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(telInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(ageInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
        await interaction.showModal(modal)
        
        const filter = (interaction) => interaction.customId === 'myModal'
        interaction
        .awaitModalSubmit({filter, time: 280_000})
        .then((modalInteraction) => {
            const nameValue = modalInteraction.fields.getTextInputValue('nameInput');
            const idValue = modalInteraction.fields.getTextInputValue('idInput');
            const telValue = modalInteraction.fields.getTextInputValue('telInput');
            const ageValue = modalInteraction.fields.getTextInputValue('ageInput');

            const exampleEmbed = new EmbedBuilder()
                .setColor(0x960202)
                .setTitle("Novo formulário registrado!")
                .setDescription(`✅ <@${interaction.user.id}> acabou de se registrar!`)
                .setThumbnail('https://i.imgur.com/l4gtEqf.jpeg')
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Nome completo:', value: `${nameValue}`},
                    { name: 'ID:', value: `${idValue}`},
                    { name: 'Telefone: ', value: `${telValue}`},
                    { name: 'Idade:', value: `${ageValue}`}
                )
            interaction.member.setNickname(`${nameValue} | ${idValue}`)
            
            const channel = interaction.guild.channels.cache.get('1176614338388303924'); // configurar dinamicamente esse canal
            if (channel) {
                channel.send({ content: `<@${interaction.user.id}>`, embeds: [exampleEmbed] });
            } else {
                console.log('Canal não encontrado.');
            }
            modalInteraction.reply({ content: `***<@${interaction.user.id}>, você foi registrado(a) com sucesso!***`});
        })
        .catch((err) => {
            console.log('Erro');
        });
        
        } catch (error) {
            console.error('Error displaying modal:', error);
        }
    }
}