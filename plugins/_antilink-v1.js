let handler = m => m
//๒๒๒๒๒๒๒๒
let linkRegex = /๒/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikick
    await conn.sendButton(m.chat, `*Virtext Terdeteksi!*${isBotAdmin ? '' : '\n\nbukan admin jadi gabisa kick t_t'}\n\nKetik *.off antilink* untuk mematikan fitur ini${opts['restrict'] ? '' : '\nketik *#on restrict* supaya bisa kick'}`, '©fahril Bot', 'Matikan Antilink', '#off antilink', m)
    //if (global.opts['restrict']) {
      if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
//    }
  }
  return true
}

module.exports = handler
