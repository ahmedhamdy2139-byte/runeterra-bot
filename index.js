const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { Canvas } = require("skia-canvas");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log('Runeterra Bot is online!');
});

client.on('guildMemberAdd', async member => {

  const channel = member.guild.channels.cache.get("1480574485609582652");
  if (!channel) return;

  const canvas = Canvas.createCanvas(1024, 500);
  const ctx = canvas.getContext('2d');

  // خلفية
  ctx.fillStyle = "#1e1e2f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // عنوان
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Welcome to Runeterra", 280, 120);

  // اسم العضو
  ctx.font = "40px sans-serif";
  ctx.fillStyle = "#aaaaaa";
  ctx.fillText(member.user.username, 420, 200);

  // أفاتار العضو
  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ extension: 'png', size: 256 })
  );

  ctx.beginPath();
  ctx.arc(200, 200, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatar, 100, 100, 200, 200);

  const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "welcome.png" });

  channel.send({
    content: `
🌍 **Welcome to Runeterra**

Hey ${member} 👋

📜 Rules → <#1480574508715737149>  
🎭 Roles → <#1480574742535602276>  
🚀 Boost → <#1480574534133350552>  

💬 Chat → <#1480572826913210458>  
😂 Memes → <#1480575532377575616>  
💡 Suggestions → <#1480581624780427395>

🎮 Games
⚔️ League of Legends  
🚗 Rocket League  
🏹 Albion Online  
⛏️ Minecraft  
🎯 Valorant  

Enjoy your stay in **Runeterra ⚔️**
`,
    files: [attachment]
  });

});


client.login("MTQ4MDU5MjkyNzE0NjM3NzMwOQ.Gp0iJs.8AOXkJnsJaOUPnPgfABawXX7AKWi_np3KYIHEc");
