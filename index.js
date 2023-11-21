// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, InteractionType } = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// import dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    }
    else{
        console.log(`This command in ${filePath} has no "data" nor "execute"`)
    }
}

console.log(client.commands)

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(TOKEN);

// Interactions listener
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    
    if (!command) {
        console.error("Comando não encontrado")
        return
    }

    else if (interaction.type === InteractionType.ModalSubmit){
        console.log('Modal teste')

    }

    try {
        await command.execute(interaction)
    }
    catch (error){
        console.error(error)
        await interaction.reply("Houve um erro ao executar este comando!")
    }
})