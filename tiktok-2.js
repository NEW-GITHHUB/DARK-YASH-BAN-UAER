//==============================DARK YASH TIKTOK DOWNLOAD COMMAND==============================
const config = require('../config')
//const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const fs = require('fs')
const axios = require('axios')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const moment = require('moment-timezone');
const os = require("os")
const yts = require('yt-search')
const googleTTS = require('google-tts-api');

function convertToStandardYouTubeURL(url) {
const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
const match = url.match(regex);
if (match && match[1]) {
const videoId = match[1];
return `https://www.youtube.com/watch?v=${videoId}`;
 } else {
return url;
}
}
//=============================ttdl scrapper==================================== 
async function tiktokdl(query) {
return new Promise(async (resolve, reject) => {
try {
const encodedParams = new URLSearchParams();
encodedParams.set("url", query);
encodedParams.set("hd", "1");

const response = await axios({
method: "POST",
url: "https://tikwm.com/api/",
headers: {
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
Cookie: "current_language=en",
"User-Agent":
"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
},
data: encodedParams,
});
const videos = response.data;
resolve(videos);
} catch (error) {
// reply(`${error}`)
}
});
}
//=============================ttdl scrapper==================================== 


cmd({
    pattern: "tiktok",
    alias: ["ttwm"],
    desc: "Download tiktok videos",
    category: "download",
    use: '.tiktok3 <tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}

//const config = await readEnv();
//const iAm = fs.readFileSync('isMe.txt', 'utf8').trim()
    
await conn.sendMessage(from, { react: { text: '💥', key: mek.key }})


if (!q) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text: '*❌ Please Give Me A Tiktok Url...*'},{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}

let data = await tiktokdl(q)

let desc = `❍⚯──────────────────────⚯❍
       *🧧 MANIYA-X-MD TIKTOK DL 🧧*
❍⚯──────────────────────⚯❍

*\`➤ Title :\`* ${data.data.title}

*\`➤ Profile_Name:\`* ${data.data.author.nickname}

*\`➤ Country:\`* ${data.data.region}

┏━━━━━━━━━━━━━━━━━━━┓
┣ 💬 *Comments:* ${data.data.comment_count}
┣ 🔀 *Share:* ${data.data.share_count}
┣ 👀 *Views:* ${data.data.play_count}
┣ ⬇️ *Downloads:* ${data.data.download_count}
┣ ⏱️ *Duration:* ${data.data.duration}
┗━━━━━━━━━━━━━━━━━━━┛

🔢 *Please reply with the number you want to select:*

*\`[1] Tiktok Video\`*
       1.1 | 🎟️ With-Watermark
       1.2 | 📼 No-Watermark
       1.3 | 🎫 No-Watermark *[HD]*

*\`[2] Tiktok Audio\`*
       2.1 | 🎶 Audio file
       2.2 | 📁 Document file
       2.3 | 🎤 Voice cut [ptt]

*🖇️ URL:* ${q}

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*

`


//==========NON BUTTON MSG SEND==========

const sentMsg = await conn.sendMessage(from,{image:{url:data.data.cover},caption:desc},{quoted:mek});
const messageID = sentMsg.key.id; // Save the message ID for later reference
await conn.sendMessage(from, { react: { text: '🔢', key:sentMsg.key }})

// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
const mek = messageUpdate.messages[0];
if (!mek.message) return;
const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
const from = mek.key.remoteJid;
const sender = mek.key.participant || mek.key.remoteJid;


// Check if the message is a reply to the previously sent message
const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

if (isReplyToSentMsg) {
// Handle correct responses (1, 2, 3, or 4)
if (['1.1', '1.2', '1.3', '2.1', '2.2','2.3'].includes(messageType)) {
//React to the (download downloading the fil)
await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
//React to the upload (sending the file)
setTimeout(async () => {
conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
}, 1000);

if (messageType === '1.1') {
// Handle option 2 (Tiktok Video No Watermark)
let wm = await conn.sendMessage(from, { video: { url: data.data.wmplay }, caption: "- WITH-WATERMARK\n\n*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*",}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
await conn.sendMessage(from, { react: { text: '🎥', key: wm.key }})

} else if (messageType === '1.2') {
// Handle option 4 (Tiktok Video No Watermark as Document)
let nowm = await conn.sendMessage(from, { video: { url: data.data.play }, caption: "- NO-WATERMARK\n\n*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*",}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
await conn.sendMessage(from, { react: { text: '🎥', key: nowm.key }})

} else if (messageType === '1.3') {
// Handle option 4 (Tiktok Video No Watermark as Document)
let hdq = await conn.sendMessage(from, { video: { url: data.data.hdplay }, caption: "- HD-QUALITY\n\n*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*",}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
await conn.sendMessage(from, { react: { text: '🎥', key: hdq.key }})

} else if (messageType === '2.1') {
// Handle option 5 (Tiktok Audio File)
let aud = await conn.sendMessage(from, { audio: { url: data.data.music },mimetype:"audio/mpeg"}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
await conn.sendMessage(from, { react: { text: '🎶', key: aud.key }})

} else if (messageType === '2.2') {
let doc = await conn.sendMessage(from,{document: {url:data.data.music},mimetype:"audio/mpeg",fileName: data.data.title, caption:"*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*"},{quoted:mek})
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
await conn.sendMessage(from, { react: { text: '🎶', key: doc.key }})

} else if (messageType === '2.3') {
// Handle option 5 (Tiktok Audio File)
let vo = await conn.sendMessage(from, { audio: { url: data.data.music },mimetype:'audio/mpeg', ptt: true }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
await conn.sendMessage(from, { react: { text: '🎙️', key: vo.key }})

}
} else {
// React with invalid input
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
// Invalid option
let tt = await conn.sendMessage(from, { text: '*⚠️ Invalid option! Please enter a valid number (1.1-1.3 , 2.1-2.3) ‼️*' }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❓', key: tt.key } });

}    
}
});
} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console (e)
}
});
//============================== CMD END ==============================


 
cmd({
    pattern: "trt",
    alias: ['translate'],
    category: "convert",
    filename: __filename,
    desc: "Translate's given text in desired language."

},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
if ( isCmd ){
await conn.readMessages([mek.key]);
}
await conn.sendMessage(from, { react: { text: '🔤', key: mek.key } });

if(!m.quoted && !m.mentionJid) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text: '*❌ Please Give Me A Text...*' },{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}
const { translate } = require('@vitalets/google-translate-api');

let lang = `${q}`;
if(!lang) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rcr = await conn.sendMessage(from,{text:"❌ *Please provide a language to translate*"},{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rcr.key }}
return await conn.sendMessage(from, reactionMessage)
}
let text;
if (m.quoted.conversation) {
text = m.quoted.conversation;
} else if (m.quoted.imageMessage && m.quoted.imageMessage.caption) {
text = m.quoted.imageMessage.caption;
} else if (m.quoted.videoMessage && m.quoted.videoMessage.caption) {
text = m.quoted.videoMessage.caption;
} else {
return;  
}

try{

const response = await translate(text, { to: lang });
let sendtrt = await conn.sendMessage(from, { text: `*🔴 TRANSLATED INTO : ${lang}*\n\n🔵 ${response.text}\n\n*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*` }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '✅', key: sendtrt.key } });
        
} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
});



cmd({
    pattern: "cal",
    desc: "...",
    category: "mathtool",
    use: '.cal',
    filename: __filename
}, 

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
if ( isCmd ){
await conn.readMessages([mek.key]);
}
    
await conn.sendMessage(from, { react: { text: '➕', key: mek.key } });

if(!q) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text:"❌ *Please give me number...*\n\n‼️ *EXAMPLE :-*‼️\n\n> *.cal 12+12 : PLUS* \n> *.cal 12-12 : MINUS*\n> *.cal 12÷12 : DIVIDED*\n> *.cal 12×12 : MULTIPLY*"},{quoted:mek})
const reactionMessage = {react: {text: "❗", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}
const math = require('mathjs');
const result = math.evaluate(q);
//reply(`🗣️ *According to Your Question, The Answer is Given Below*\n\n*\`${q}\`* = *${result}*\n\n● *ʙʟᴀᴄᴋ ꜰɪʀᴇ ᴍᴅ ʙʏ ʜᴅꜱ* ●`);
let sendanswer = await conn.sendMessage(from, { text: `🗣️ *ACCORDING TO YOUR QUESTION, THE ANSWER IS GIVEN BELOW*\n\n✍️ *\`${q}\`* = *${result}*\n\n*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*` }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '✅', key: sendanswer.key } });

} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e);
}
});



cmd({
    pattern: "tdy",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}
const currentTime = moment().tz('Asia/Colombo').format('hh:mm:ss A');   
const currentDate = moment().tz('Asia/Colombo').format('YYYY-MM-DD');


function getTimeOfDay() {
const hour = moment().tz('Asia/Colombo').hour();
if (hour >= 0 && hour < 12) {
return 'Good morning 💐🌞';
} else if (hour >= 12 && hour < 15) {
return 'Good Afternoon';
} else if (hour >= 15 && hour < 18) {
return 'Good Evening';
} else if (hour >= 18 && hour < 24) {
return 'Good night! 💤🛌💤';
}
}
let desc = `┏─❖
│「 𝗛𝗶 👋 」
┗┬❖ 「 *${pushname}* 」
   │✑
   │✑ *🌟 TODAY DATE & TIME 🌟*
   │✑ ⦁────────────────⦁
   │✑  *❄️ IT'S NOW:*
   │✑   ${getTimeOfDay()}
   │✑  *⏰ NOW TIME :*
   │✑   ${currentTime}
   │✑  *📆 TODAY DATE*
   │✑   ${currentDate}
   ┗─────────────────┈ ⳹

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*`

let df = await conn.sendMessage(from, { image: {url: "https://i.ibb.co/rDrp6VY/aec190ea955165dd.jpg" }, caption: desc }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '✨', key: df.key } });
//React to the upload (sending the file)
setTimeout(async () => {
conn.sendMessage(from, { react: { text: '🌝', key: df.key } });
}, 1000);
    
setTimeout(async () => {
conn.sendMessage(from, { react: { text: '🌼', key: df.key } });
}, 2000);

setTimeout(async () => {
conn.sendMessage(from, { react: { text: '💖', key: df.key } });
}, 3000);

setTimeout(async () => {
conn.sendMessage(from, { react: { text: '🌻', key: df.key } });
}, 4000);

setTimeout(async () => {
conn.sendMessage(from, { react: { text: '🌟', key: df.key } });
}, 5000);

setTimeout(async () => {
conn.sendMessage(from, { react: { text: '🎋', key: df.key } });
}, 6000);

setTimeout(async () => {
conn.sendMessage(from, { react: { text: '🌩️', key: df.key } });
}, 7000);
    
setTimeout(async () => {
conn.sendMessage(from, { react: { text: '💐', key: df.key } });
}, 8000);

} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e);
}
});


cmd({
    pattern: "fb",
    alias: ["os"],
    desc: "Check bot system info.",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, isCreator, prefix, isMod, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}
if (!q && !q.startsWith("https://")) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text: '*❌ Please Give Me A Fb Url...*' },{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}
//fetch data from api  
let data = await fetchJson(`https://www.dark-yasiya-api.site/download/fbdl2?url=${q}`)

let desc = `*┠─❲ 🧛 MANIYA-X-MD🧛 ❳─┨*

    *🧨 FB DOWNLOADER 🧨*

*📚 \`Title:\`* Facebook Video

🔢 Please reply the number you want to select

*\`[1] facebook Video 🎥\`*
       1.1 | 🪫 SD QUALITY
       1.2 | 🔋 HD QUALITY

*\`[2] facebook Video Audio 🎶\`*
       2.1 | Audio file 🎶
       2.2 | Document file 📂
       2.3 | Voice cut [ptt] 🎤

*🖇️ FB URL:* ${q}

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`

//==========NON BUTTON MSG SEND==========


sentMsg = await conn.sendMessage(from,{text: desc}, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
const mek = messageUpdate.messages[0];
if (!mek.message) return;
const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
const from = mek.key.remoteJid;
const sender = mek.key.participant || mek.key.remoteJid;

 
// Check if the message is a reply to the previously sent message
const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

if (isReplyToSentMsg) {
// Handle correct responses (1, 2, 3, or 4)
if (['1.1', '1.2'].includes(messageType)) {
//React to the (download downloading the fil)
await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
//React to the upload (sending the file)
setTimeout(async () => {
conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
}, 1000);


if (messageType === '1.1') {
// Handle option 1 (Audio File)
await conn.sendMessage(from, { video: { url: data.result.sdLink}, mimetype: "video/mp4", caption: "*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*"}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });
//aud send react
await conn.sendMessage(from, { react: { text: '🎧', key: aud.key }});

} else if (messageType === '1.2') {
// Handle option 2 (Document File)
// React with file upload completes
await conn.sendMessage(from, { video: { url: data.result.hdLink}, mimetype: "video/mp4", caption: "*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*"}, { quoted: mek })

await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });
//aud doc react send
await conn.sendMessage(from, { react: { text: '🎶', key: doc.key }});
}
} else {
// React with invalid input
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
// Invalid option
let df = await conn.sendMessage(from, { text: '*⚠️ Invalid option! Please enter a valid number (1-4) ‼️*' }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❓', key: df.key }})
}
}
});
      
} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e);
}
});

cmd({
    pattern: "count",
    desc: "count char",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
if ( isCmd ){
await conn.readMessages([mek.key]);
}
let targetText = q || (m.quoted && m.quoted.msg) ? m.quoted.msg : null;

if (!targetText) {
await conn.sendMessage(from, { react: { text: '⁉️', key: mek.key } });
return await conn.sendMessage(from, { text: '*⛔ Please mention a text message*' }, { quoted: mek });
}

let charCount = targetText.length;
let wordCount = targetText.trim().split(/\s+/).length;
let paragraphCount = targetText.trim().split(/\n+/).length;

const charLimit = 30000;

if (charCount > charLimit) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
return await conn.sendMessage(from, { text: `⛔ *Message exceeds the character limit of ${charLimit}. Current count: ${charCount}*` }, { quoted: mek });
}

let countMessage = `🔵 *character count: ${charCount}*\n🟢 *word count: ${wordCount}*\n🟣 *paragraph count: ${paragraphCount}*\n\n*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*`;
let countchar = await conn.sendMessage(from, { text: countMessage }, { quoted: mek });
return await conn.sendMessage(from, { react: { text: '✅', key: countchar.key } });

} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e);
}
});

cmd({
    pattern: "system",
    alias: ["os"],
    desc: "Check bot system info.",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, isCreator, prefix, isMod, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let maru =`*┏────────────────────────┓*
*├ ⏰ \`Uptime :-\`*  ${runtime(process.uptime())}
*├ 📟 \`Ram usage :-\`* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*├ ⚙️ \`Platform :-\`*  ${os.hostname()}
*├ 👨‍💻 \`Owners :-\`* Manthila
*├ 🧬 \`Version :-\`* 1.0.0
*┗────────────────────────┛*
`

const mass = await conn.sendMessage(from,{image:{url:"https://i.ibb.co/RGWM42yF/0e921613bfc97476.jpg"},caption:maru},{quoted:mek})
await conn.sendMessage(m.chat, {  react: {  text: "📟",   key: mass.key }})

}catch(e){
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
})
//========================================================================

cmd({
    pattern: "toaudio",
    desc: "tado",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}
await conn.sendMessage(from, { react: { text: '🎤', key: mek.key } });

if(!m.quoted && !m.mentionJid) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text: "*❌ Please Give Me a Video or Voice Meassge...*"},{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}

const fileDataMB = "30";

if (mek.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.fileLength) {
const fileLengthBytes = mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength;
const fileLengthMB = fileLengthBytes / (1024 * 1024);

if (fileLengthMB > fileDataMB) return reply(`❌ *Cannot fetch videos longer than ${fileDataMB}MB*`);
}
if (mek.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage?.fileLength) {
const fileLengthBytes = mek.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.fileLength;
const fileLengthMB = fileLengthBytes / (1024 * 1024);

if (fileLengthMB > fileDataMB) return reply(`❌ *Cannot fetch audios longer than ${fileDataMB}MB*`);
}
if (mek.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage?.fileLength) {
const fileLengthBytes = mek.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage.fileLength;
const fileLengthMB = fileLengthBytes / (1024 * 1024);

if (fileLengthMB > fileDataMB) return reply(`❌ *Cannot fetch audios longer than ${fileDataMB}MB*`);
}

if (!(m.quoted.type === "audioMessage" || m.quoted.type === "videoMessage" || m.quoted.type === "documentMessage")) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
return await conn.sendMessage(from, { text: '⛔ *Cannot convert this message type.*' }, { quoted: mek });
}

if(m.quoted.type === "audioMessage" || m.quoted.type === "videoMessage" || m.quoted.type === "documentMessage") {

var nameJpg = m.id;

const mass = await conn.sendMessage(from, { text: "*♻️ Converting and Uploading your File...*" }, { quoted: mek });  
let buff = await m.quoted.download(nameJpg)
let fileType = require('file-type');
let type = fileType.fromBuffer(buff);
await fs.promises.writeFile("./" + type.ext, buff);

let sendaudio = await conn.sendMessage(m.chat, { audio: fs.readFileSync("./" + type.ext), mimetype:  'audio/mpeg',ptt: true,fileName: `${m.id}.mp3` },{quoted: mek})
//await conn.sendMessage(m.chat, { delete: mass })
await conn.sendMessage(m.chat, { react: { text: '✅', key: mass.key } });
await conn.sendMessage(from, { react: { text: '🎙️', key: sendaudio.key } });
}       
}catch(e){
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
});

cmd({
    pattern: "song",
    desc: "tado",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}
await conn.sendMessage(from, { react: { text: '🎶', key: mek.key } });

if (!q) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text: '*❌ Please give me a text or url that I want to search...*' },{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}

let mm = convertToStandardYouTubeURL(q)	
const search = await yts(mm)
const data = search.videos[0];
const url = data.url

let desc = `*┠─❲ 🧛 MANIYA-X-MD 🧛 ❳─┨*

    *🎶 SONG DOWNLOADER 🎶*

*┏─────────────────────┓*
┠ *ℹ \`Title :\`* ${data.title}
┠ *👤 \`Author :\`* ${data.author.name}
┠ *👁️‍🗨️ \`Views :\`* ${data.views}
┠ *📌 \`Ago :\`* ${data.ago}
┠ *🕘 \`Duration :\`* ${data.timestamp}
┠ *🔗 \`Url :\`* ${data.url}
*┗─────────────────────┛*

*🔢 select the audio type from bellow...*

  1 | *Audio File 🎶*
  2 | *Document File 📁*
  
 *⦁ ᴅᴀʀᴋ-ʏᴀꜱʜ-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`

//==========NON BUTTON MSG SEND==========

const sentMsg = await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc}, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
const mek = messageUpdate.messages[0];
if (!mek.message) return;
const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
const from = mek.key.remoteJid;
const sender = mek.key.participant || mek.key.remoteJid;

//-------------------------------------------------------------------------------

 
// Check if the message is a reply to the previously sent message
const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

if (isReplyToSentMsg) {
// Handle correct responses (1, 2, 3, or 4)
if (['1', '2'].includes(messageType)) {
//React to the (download downloading the fil)
await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
//React to the upload (sending the file)
setTimeout(async () => {
conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
}, 1000);

//==========DOWNLOAD AUDIO==============
let dowmn = await fetchJson(`https://api.fgmods.xyz/api/downloader/ytmp4?url=${url}&apikey=fg_99KrrTNJ`) 
//======================================

if (messageType === '1') {
// Handle option 1 (Audio File)
let aud = await conn.sendMessage(from,{audio: {url: dowmn.result.dl_url },mimetype:"audio/mpeg"},{quoted:mek});
 // React with file upload completes
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });
//aud send react
await conn.sendMessage(from, { react: { text: '🎧', key: aud.key }});

} else if (messageType === '2') {
// Handle option 2 (Document File)
let doc = await conn.sendMessage(from,{document: {url: dowmn.result.dl_url },mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁"},{quoted:mek});
// React with file upload completes
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });
//aud doc react send
await conn.sendMessage(from, { react: { text: '🎶', key: doc.key }});
}
} else {
// React with invalid input
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
// Invalid option
let df = await conn.sendMessage(from, { text: '*⚠️ Invalid option! Please enter a valid number (1-4) ‼️*' }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❓', key: df.key }})
}
}
});     

}catch(e){
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
});

cmd({
    pattern: "tts",
    desc: "google tts",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( isCmd ){
await conn.readMessages([mek.key]);
}
await conn.sendMessage(from, { react: { text: '🎙️', key: mek.key } });

if(!q) {
setTimeout(async () => {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}, 500);
const rc = await conn.sendMessage(from,{text: "*❌ Please Give Me A Text...* " },{quoted:mek})
const reactionMessage = {react: {text: "❓", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}
const ttsurl = googleTTS.getAudioUrl(q, {
                lang: "si",
                slow: false,
                host: "https://translate.google.com",
            });

let df = await conn.sendMessage(from, { text: `*♻️ Generating and Uploading your Voice Message...*` }, { quoted: mek });

           let aud = await conn.sendMessage(from, {
                audio: {
                    url: ttsurl,
                },
                mimetype: "audio/mpeg",
                fileName: `.random.tts.mp3.ptt`,
                ptt: true ,
            }, {
                quoted: mek,
            });                            

await conn.sendMessage(from, { react: { text: '🎤', key: aud.key } });
await conn.sendMessage(from, { react: { text: '✅', key: df.key } });

}catch(e){
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
});




cmd({
    pattern: "menu",
    desc: "To get the menu.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from, { react: { text: '🛍️', key: mek.key }});

const currentTime = moment().tz('Asia/Colombo').format('hh:mm:ss A ');   
const currentDate = moment().tz('Asia/Colombo').format('YYYY-MM-DD');


function getTimeOfDay() {
const hour = moment().tz('Asia/Colombo').hour();
if (hour >= 0 && hour < 12) {
return 'Good morning 💐🌞';
} else if (hour >= 12 && hour < 15) {
return 'Good Afternoon';
} else if (hour >= 15 && hour < 18) {
return 'Good Evening';
} else if (hour >= 18 && hour < 24) {
return 'Good night! 💤🛌💤';
}
}
    
let menumsg = `*👋 𝗛𝗘𝗟𝗟𝗢...${pushname}...*
   
*╭─「👹ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ👹」*
┃ *➩⏰ ɴᴏᴡ ᴛɪᴍᴇ -* ${currentTime}
┃ *➩📆 ɴᴏᴡ ᴅᴀᴛᴇ -* ${currentDate}
┃ *➩⚙️ ʀᴀᴍ ᴜꜱᴀɢᴇ -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB 
*╰────────────⦁⦁➤*
╭─────────────⦁⦁➤
┃ *⛵ LIST PANEL*
┃⦁──────────⦁
├ 📥  1 | *DOWNLOAD*
├ 🔄  2 | *CONVERT*
├ 👨‍💻  4 | *OWNER*
├ 🪀  5 | *GROUP*
├ 🫅  6 | *MAIN*
╰─────────────⦁⦁➤

*💥 Reply the Number you want to select*
`
let downloadmenu = `*👋 Hellow ${pushname}*...

*╭─「👹ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ👹」*
┃ *➩⚙️ ʀᴜɴ ᴜꜱᴀɢᴇ -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB 
┃ *➩⚙️ ʀᴀᴍ ᴛɪᴍᴇ -*  ${runtime(process.uptime())} 
*╰─────────────⦁⦁➤*
╭──────────────⦁⦁➤
┃ *📥 DOWNLOAD MENU*
┃ *⦁─────────────⦁*
├📥  ${config.PREFIX}song
├📥  ${config.PREFIX}video
├📥  ${config.PREFIX}fb
├📥  ${config.PREFIX}tiktok
├📥  ${config.PREFIX}ig
├📥  ${config.PREFIX}twitter
╰─────────────⦁⦁➤

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`

let convertmenu = `*👋 Hellow ${pushname}*...  

*╭─「👹ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ👹」*
┃ *➩⚙️ ʀᴜɴ ᴜꜱᴀɢᴇ -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB 
┃ *➩⚙️ ʀᴀᴍ ᴛɪᴍᴇ -*  ${runtime(process.uptime())} 
*╰─────────────⦁⦁➤*
╭──────────────⦁⦁➤
┃ *🔄 CONVERT MENU*
┃ *⦁─────────────⦁*
├ 🔄  ${config.PREFIX}img2url
├ 🔄  ${config.PREFIX}sticker
├ 🔄  ${config.PREFIX}surl
├ 🔄  ${config.PREFIX}tts
├ 🔄  ${config.PREFIX}toptt
├ 🔄  ${config.PREFIX}toaudio
├ 🔄  ${config.PREFIX}trt
╰─────────────⦁⦁➤

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`

let ownermenu = `*👋 Hellow ${pushname}*...  

*╭─「👹ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ👹」*
┃ *➩⚙️ ʀᴜɴ ᴜꜱᴀɢᴇ -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB 
┃ *➩⚙️ ʀᴀᴍ ᴛɪᴍᴇ -*  ${runtime(process.uptime())} 
*╰─────────────⦁⦁➤*
╭──────────────⦁⦁➤
┃ *👨‍💻 OWNER MENU*
┃ *⦁─────────────⦁*
├👨‍💻  ${config.PREFIX}alljid
├👨‍💻  ${config.PREFIX}name
├👨‍💻  ${config.PREFIX}about 
├👨‍💻  ${config.PREFIX}restart
├👨‍💻  ${config.PREFIX}boom
╰─────────────⦁⦁➤

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`
let groupmenu = `*👋 Hellow ${pushname}*... 

*╭─「👹ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ👹」*
┃ *➩⚙️ ʀᴜɴ ᴜꜱᴀɢᴇ -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB 
┃ *➩⚙️ ʀᴀᴍ ᴛɪᴍᴇ -*  ${runtime(process.uptime())} 
*╰─────────────⦁⦁➤*
╭──────────────⦁⦁➤
┃ *🪀 GROUP MENU*
┃ *⦁─────────────⦁*
├🪀  ${config.PREFIX}mute
├🪀  ${config.PREFIX}unmute
├🪀  ${config.PREFIX}promote 
├🪀  ${config.PREFIX}demote
├🪀  ${config.PREFIX}invite
├🪀  ${config.PREFIX}kick
├🪀  ${config.PREFIX}left
├🪀  ${config.PREFIX}kickall
├🪀  ${config.PREFIX}gname
├🪀  ${config.PREFIX}gdec
├🪀  ${config.PREFIX}gdp
├🪀  ${config.PREFIX}del
├🪀  ${config.PREFIX}automute
├🪀  ${config.PREFIX}autounmute
╰─────────────⦁⦁➤

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`
let mainmenu = `*👋 Hellow ${pushname}*... 

*╭─「👹ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ👹」*
┃ *➩⚙️ ʀᴜɴ ᴜꜱᴀɢᴇ -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB 
┃ *➩⚙️ ʀᴀᴍ ᴛɪᴍᴇ -*  ${runtime(process.uptime())} 
*╰─────────────⦁⦁➤*
╭──────────────⦁⦁➤
┃ *🫅 MAIN MENU*
┃ *⦁─────────────⦁*
├🤴  ${config.PREFIX}alive
├🤴  ${config.PREFIX}menu
├🤴  ${config.PREFIX}ping
├🤴  ${config.PREFIX}system
├🤴  ${config.PREFIX}list
├🤴  ${config.PREFIX}today
├🤴  ${config.PREFIX}jid
╰─────────────⦁⦁➤

*⦁ ᴍᴀɴɪʏᴀ-x-ᴍᴅ ʙʏ ᴍᴀɴɪ ⦁*
`


// Send the initial message and store the message ID

const sentMsg = await conn.sendMessage(from, { image: {url: "https://i.ibb.co/MxN2rD6T/84e5b4138d23d869.jpg"}, caption: menumsg }, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
const mek = messageUpdate.messages[0];
if (!mek.message) return;
const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
const from = mek.key.remoteJid;
const sender = mek.key.participant || mek.key.remoteJid;


    
// Check if the message is a reply to the previously sent message
const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

if (isReplyToSentMsg) {
// React to the user's reply (the "1" or "2" message)
//await conn.sendMessage(from, { react: { text: '🆗', key: mek.key } });

if (messageType === '1') {
// Handle option 1 (Audio File)
await conn.sendMessage(from, { image: {url: "https://i.ibb.co/MxN2rD6T/84e5b4138d23d869.jpg"}, caption: downloadmenu }, { quoted: mek });
} else if (messageType === '2') {
// Handle option 2 (Document File)
await conn.sendMessage(from, { image: {url: "https://i.ibb.co/MxN2rD6T/84e5b4138d23d869.jpg"}, caption: convertmenu }, { quoted: mek });
} else if (messageType === '3') {
await conn.sendMessage(from, { image: {url: "https://i.ibb.co/MxN2rD6T/84e5b4138d23d869.jpg"}, caption: ownermenu }, { quoted: mek });
} else if (messageType === '4') {
await conn.sendMessage(from, { image: {url: "https://i.ibb.co/MxN2rD6T/84e5b4138d23d869.jpg"}, caption:  groupmenu }, { quoted: mek });
} else if (messageType === '5') {
await conn.sendMessage(from, { image: {url: "https://i.ibb.co/MxN2rD6T/84e5b4138d23d869.jpg"}, caption:  mainmenu }, { quoted: mek });

}

// React to the successful completion of the task
}
});

}catch(e){
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
});

            
cmd({
        pattern: "restart",
        desc: "To restart bot",
        category: "owner",
        filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, isMe, command, args, q, isdev, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isCreator, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{ 

if(!isOwner) {
const rc = await conn.sendMessage(from,{text:"⛔ *THIS IS AN OWNER COMMAND.*"},{quoted:mek})
const reactionMessage = {react: {text: "⛔", key: rc.key }}
return await conn.sendMessage(from, reactionMessage)
}

const mass = await conn.sendMessage(from, { text: "🌟 𝗦𝗧𝗢𝗣𝗣𝗜𝗡𝗚 𝗔𝗟𝗟 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡𝗦 𝗔𝗡𝗗 𝗡𝗢𝗪 𝗠𝗔𝗡𝗜-𝗫-𝗠𝗗 𝗜𝗦 𝗥𝗘𝗦𝗧𝗔𝗥𝗧𝗜𝗡𝗚...♻"}, { quoted: mek });
await conn.sendMessage(m.chat, {  react: {  text: "🔄",   key: mass.key }})
const { exec } = require("child_process") 
exec('pm2 restart all')

} catch (e) {
let dm = await conn.sendMessage(from, { text: "*🛑 MANIYA-X-MD ERROR*"}, { quoted: mek });
await conn.sendMessage(from, { react: { text: '❗', key: dm.key } });
console.log(e)
}
})
