import {
  promises,
  readFileSync
 } from "fs"
 import {
  join
 } from "path"
 import {
  xpRange
 } from "../lib/levelling.js"
 import moment from "moment-timezone"
 import os from "os"
 import fs from "fs"
 import fetch from "node-fetch"

 const defaultMenu = {
  before: `
--✦𝙼𝙾𝙷𝙲𝙸𝙽𝙴 𝚁𝙾𝙱𝙾𝚃𝙸𝙲𝚂 𝙸𝙽𝙵𝙾✦--
 ♕︎𝙷𝙸 %name ✦!!
*:صفحة صاحب الروبوت*
- https://izumie-img.vercel.app/Main/izumie/HORI-MD/3.jpg
${ucapan()}
-👑ɢʀᴏᴜᴘ ᴡʜᴀᴛsᴀᴘᴘ👑-
- https://chat.whatsapp.com/KTa9hOJeYpV4SRYSFxFZrV
-⭕𝙾𝚆𝙽𝙴𝚁'𝚂 𝙸𝙽𝚂𝚃𝙰𝙶𝚃𝙰𝙼⭕-
-www.instagram.com/mh7__x
┏━━━━━━━━━━━━━━┓
‎☆------ᴅᴏᴡɴʟᴏᴀᴅᴇʀ-----☆
┗━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━┓
┃𖦹.ɪɢ[ɪɴsᴛᴀɢʀᴀᴍ ʀᴇᴇʟ]
┃𖦹.ғʙ[ғᴀᴄᴇʙᴏᴏᴋ ᴠɪᴅᴇᴏ]
┃𖦹.ᴍᴇᴅɪᴀғɪʀᴇ[ᴍᴇᴅɪᴀғɪʀᴇ]
┃𖦹.𝚈𝚃𝙼𝙿3[𝚈𝚃 𝙰𝚄𝙳]
┃𖦹.𝚈𝚃𝙼𝙿4[𝚈𝚃 𝚅𝙸𝙳]
┃𖦹.𝚈𝚃𝙼𝙿3𝙳𝙾𝙲[𝚈𝚃𝙰𝚄𝙳(𝙳𝙾𝙲)]
┃𖦹.𝚈𝚃𝙼𝙿4𝙳𝙾𝙲[𝚈𝚃𝚅𝙸𝙳(𝙳𝙾𝙲)]
┃𖦹.𝙿𝙻𝙰𝚈𝙻𝙸𝚂𝚃[𝙿𝙻𝙰𝚈𝙻𝙸𝚂𝚃]
┃𖦹.𝙿𝙻𝙰𝚈𝙻𝙸𝚂𝚃2[𝚂𝙴𝚁𝚅𝙴𝚁2]
┃𖦹.𝚃𝚆𝙸𝚃𝚃𝙴𝚁[𝚃𝚆𝙸𝚃𝚃𝙴𝚁]
┃𖦹.𝚃𝙸𝙺𝚃𝙾𝙺[𝚃𝙸𝙺𝚃𝙾𝙺 𝚅𝙳 ]
┃𖦹.𝙸𝙼𝙰𝙶𝙴𝙽[𝙶𝙾𝙾𝙶𝙻𝙴_ɪᴍɢ]
┃𖦹.𝙼𝙾𝙳𝙰𝙿𝙺[𝙰𝙿𝙿𝙻𝙸𝙲𝙰𝚃𝙸𝙾𝙽]
┃𖦹.𝙶𝙳𝚁𝙸𝚅𝙴[𝙶𝙾𝙾𝙶𝙻𝙴𝙳𝚁𝙸𝚅𝙴]
┗━━━━━━━━━━━━┛
┏━━━━━━━━━━━━┓
‎☆---- sᴇᴀʀᴄʜɪɴɢ----☆
┗━━━━━━━━━━━━┛
┃☁︎.𝚈𝚃𝚂[𝚈𝚃 𝚂𝙴𝙰𝚁𝙲ʜ]
┃☁︎.𝙶𝙾𝙾𝙶𝙻𝙴[𝙶𝙾𝙾𝙶𝙻𝙴]
┃☁︎.𝚆𝙸𝙺𝙸[𝚆𝙸𝙺𝙸𝙿𝙴𝙳𝙸𝙰]
┃☁︎.𝙳𝙰𝙻𝙻𝙴[𝙸𝙰𝙸𝙼𝙶𝙼𝙰𝙺𝙴𝚁]
┃☁︎.𝙻𝚈𝚁𝙸𝙲𝚂[𝙼𝚄𝚂𝙸𝙲 𝙻𝚈𝚁𝙲]
┃☁︎.𝙰𝙸[𝙲𝙷𝙰𝚃𝙶𝙿𝚃 𝙴𝙽𝙶𝙸𝙽𝙴]
┗━━━━━━━━━━━━┛
┏━━━━━━━━━━━━┓
‎☆------sᴛɪᴋᴄᴇʀs------☆
┗━━━━━━━━━━━━┛
┃✿︎.𝚂𝚃𝙸𝙲𝙺𝙴𝚁[𝙼𝙰𝙺𝙴𝚁]
┃✿︎.𝚆𝙼[𝚁𝙸𝙶𝙷𝚃𝚂]
┗━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━┓
‎☆------ᴄᴏɴᴠᴇʀᴛᴇʀ----☆
┗━━━━━━━━━━━━━┛
┃⁂.𝚃𝙾𝙸𝙼𝙶[𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚃𝙾𝙸𝙼𝙶]
┃⁂.𝚃𝙾𝙼𝙿4[𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚃𝙾𝚅𝙸𝙳]
┃⁂.𝚃𝙾𝚄𝚁𝙻[𝙸𝙼𝙰𝙶𝙴𝚃𝙾𝚄𝚁𝙻]
┃⁂.𝚃𝚃𝚂[𝚃𝙴𝚇𝚃 𝚃𝙾 𝚂𝙾𝚄𝙽𝙳]
┗━━━━━━━━━━━━━┛
`.trimStart(),
 header: "",
 body: "",
 footer: "",
 after: "",
 }
 let handler = async (m, {
  conn,
  usedPrefix: _p,
  __dirname,
  args
 }) => {
  await conn.sendMessage(m.chat, {
   react: {
 text: "🫶🏻",
 key: m.key,
   }
  })

  let tags = {}

  try {

   /* Info Menu */
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   let _package = JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => ({}))) || {}
   let {
 age,
 exp,
 limit,
 level,
 role,
 registered,
 credit
   } = glb[m.sender]
   let {
 min,
 xp,
 max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()


   let ucpn = `${ucapan()}`

   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
 process.send("uptime")
 _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
 }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)


   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
   let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
 return {
  help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
  tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
  prefix: "customPrefix" in plugin,
  limit: plugin.limit,
  premium: plugin.premium,
  enabled: !plugin.disabled,
 }
   })
   for (let plugin of help)
 if (plugin && "tags" in plugin)
  for (let tag of plugin.tags)
   if (!(tag in tags) && tag) tags[tag] = tag
   conn.menu = conn.menu ? conn.menu : {}
   let before = conn.menu.before || defaultMenu.before
   let header = conn.menu.header || defaultMenu.header
   let body = conn.menu.body || defaultMenu.body
   let footer = conn.menu.footer || defaultMenu.footer
   let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? "" : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
   let _text = [
 before,
 ...Object.keys(tags).map(tag => {
  return header.replace(/%category/g, tags[tag]) + "\n" + [
   ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
 return menu.help.map(help => {
  return body.replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
   .replace(/%islimit/g, menu.limit ? "Ⓛ" : "")
   .replace(/%isPremium/g, menu.premium ? "🅟" : "")
   .trim()
 }).join("\n")
   }),
   footer
  ].join("\n")
 }),
 after
   ].join("\n")
   let text = typeof conn.menu == "string" ? conn.menu : typeof conn.menu == "object" ? _text : ""
   let replace = {
 "%": "%",
 p: _p,
 uptime,
 muptime,
 me: conn.getName(conn.user.jid),
 npmname: _package.name,
 npmdesc: _package.description,
 version: _package.version,
 exp: exp - min,
 maxexp: xp,
 totalexp: exp,
 xp4levelup: max - exp,
 github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
 tag,
 ucpn,
 platform,
 mode,
 _p,
 credit,
 age,
 tag,
 name,
 prems,
 level,
 limit,
 name,
 totalreg,
 totalfeatures,
 role,
 readmore: readMore
   }
   text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"), (_, name) => "" + replace[name])
   const pp = './Assets/Gurulogo.jpg'


 let contact = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}

  conn.sendMessage(m.chat, { video: { url: menuvid }, caption: text.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: contact })

  } catch (e) {
   await conn.reply(m.chat, " error", m)
   throw e
  }
 }
 handler.command = /^(menu|help|\?)$/i



 export default handler


 function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
 }

 const more = String.fromCharCode(8206)
 const readMore = more.repeat(4001)

 function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
 }

 function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
 }

 function ucapan() {
  const time = moment.tz("Africa/Casablanca").format("HH")
  let res = "𝙶𝙾𝙾𝙳 𝙼𝙾𝙾𝚁𝙽𝙸𝙽𝙶 ☀️"
  if (time >= 4) {
   res = "𝙶𝙾𝙾𝙳 𝙼𝙾𝙾𝚁𝙽𝙸𝙽𝙶🌄"
  }
  if (time >= 10) {
   res = "𝙶𝙾𝙾𝙳 𝙼𝙾𝙾𝚁𝙽𝙸𝙽𝙶☀️"
  }
  if (time >= 15) {
   res = "𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌇"
  }
  if (time >= 18) {
   res = "𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌙"
  }
  return res
   }
