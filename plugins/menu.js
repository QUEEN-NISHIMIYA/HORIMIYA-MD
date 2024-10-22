import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
const {
    proto,
    generateWAMessage,
    areJidsSameUser,
    prepareWAMessageMedia
} = (await import('@whiskeysockets/baileys')).default
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'

import fetch from 'node-fetch'
import fs from 'fs'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'

//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

let user = global.db.data.users[m.sender]
let username = conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let totaluser = Object.values(global.db.data.users).length 
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]

let str = `
  『 *HORIMIYA-MD* 』  
  
╔┈┈┈┈┈┈┈┈┈┈┈┈┈
╎❒ *CREATOR : IZUMIE*
╎
╎❒ *PLUGINS : 250 +*
╎
╎❒ *FEATURE : 400 +*
╚┈┈┈┈┈┈┈┈┈┈┈┈┈

© 2024 *Izumie Xenpai*`

let msg = generateWAMessageFromContent(m.chat, {

  viewOnceMessage: {

    message: {

        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },

        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: str
          }),

          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "Use The Below Buttons"
          }),

          header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image : { url: 'https://izumie-img.vercel.app/Main/izumie/IZUMIE/3.jpg'}}, { upload: conn.waUploadToServer})), 
            title: null,
            subtitle: null,
            hasMediaAttachment: false

          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": 
                                "{\"title\":\"BUTTON MENU\",\"sections\":[{\"title\":\"HERE IS BUTTONS MENU\",\"highlight_label\":\"GLOBAL\",\"rows\":[{\"header\":\"\",\"title\":\"🧲 Bot Menu\",\"description\":\"The Bot's secret control panel.\",\"id\":\".botmenu\"},{\"header\":\"\",\"title\":\"🪅 Owner Menu\",\"description\":\"you aint izumie bruh\",\"id\":\".ownermenu\"},{\"header\":\"\",\"title\":\"♦️ Group Menu\",\"description\":\"Head of Grp!\",\"id\":\".groupmenu\"},{\"header\":\"\",\"title\":\" Sticker Menu\",\"description\":\"A rainbow of stickers.\",\"id\":\".stickermenu\"},{\"header\":\"\",\"title\":\"🛠️ Tool Menu\",\"description\":\"Your handy-dandy toolkit.\",\"id\":\".toolmenu\"},{\"header\":\"\",\"title\":\"🐯 Logo Menu\",\"description\":\"Create a logo that screams You.\",\"id\":\".logomenu\"},{\"header\":\"\",\"title\":\"🎭 Fun Menu\",\"description\":\"The bot's party hat. Games, jokes and instant ROFLs.\",\"id\":\".funmenu\"},{\"header\":\"\",\"title\":\"🎌 Anime Menu\",\"description\":\"Explore the anime world with cool features.\",\"id\":\".animemenu\"},{\"header\":\"\",\"title\":\"All Menu\",\"description\":\"Explore everything!\",\"id\":\".allmenu\"}]}]}" 
              }
                   ]
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {

  messageId: msg.key.id

})


}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help','h','commands'] 

export default handler
