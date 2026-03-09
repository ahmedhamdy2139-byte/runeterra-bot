const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", member => {

  const channel = member.guild.channels.cache.find(
    ch => ch.name === "welcome"
  );

  if (!channel) return;

  channel.send(`🌍 Welcome to Runeterra

Hey ${member} 👋

Welcome to **Runeterra ⚔️**

📜 Rules → #rule  
🎭 Roles → #roles  
💬 Chat → #chat  

Enjoy your stay ✨`);
});

client.login(TOKEN);
