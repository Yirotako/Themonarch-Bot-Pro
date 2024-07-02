let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `@𝕥𝕙𝕖𝕞𝕠𝕟𝕒𝕣𝕔𝕙 ${pesan}`
let teks = `*⁠ATENCIÓN, POR FAVOR 🤬*\n${oi}\n\n*🚨𝙈𝙚𝙣𝙘𝙞𝙤𝙣𝙚𝙨*\n`
for (let mem of participants) {
teks += `⁠⚠️‼️ @${mem.id.split('@')[0]}\n`}
teks += `𝑻𝑯𝑬𝑴𝑶𝑵𝑨𝑹𝑪𝑯 𝑩𝑶𝑻 𝑩𝒀 𝑴𝑶𝑵𝑶𝑽𝑨𝑵 𝑽𝑬𝑵𝑻𝑨𝑺`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
