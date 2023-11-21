const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("registrar")
        .setDescription("Gera um formulário em Modal."),

    async execute(interaction){
        try{

        const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('Registro');
    
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel("Digite seu nome e sobrenome")
            .setStyle(TextInputStyle.Short);
        
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);

        modal.addComponents(firstActionRow);
        await interaction.showModal(modal)
        
        const filter = (interaction) => interaction.customId === 'myModal'
        interaction
        .awaitModalSubmit({filter, time: 280_000})
        .then((modalInteraction) => {
            const name = modalInteraction.fields.getTextInputValue('nameInput');
            console.log(name)
            
            modalInteraction.reply("*Sucesso na submissão!*")
            
        })
        .catch((err) => {
            console.log('Erro');
        });
        
        } catch (error) {
            console.error('Error displaying modal:', error);
        }
    }
}