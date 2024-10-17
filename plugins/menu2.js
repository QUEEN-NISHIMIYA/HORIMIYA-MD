import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
//const time = moment.tz('Asia/Karachi').format('HH')
//let wib = moment.tz('Asia/Karachi').format('HH:mm:ss')

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
    let pp = './assets/qasim.jpg'
    let user = global.db.data.users[who]
    let { name, diamond, lastclaim, registered, regTime, age, role, warn } = global.db.data.users[who]
    let username = conn.getName(who)
    let prem = global.prems.includes(who.split`@`[0])
    let sn = createHash('md5').update(who).digest('hex')
    let totaluser = Object.values(global.db.data.users).length 
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(850) 
    let greeting = ucapan()
    //let quote = quotes[Math.floor(Math.random() * quotes.length)];
    
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
    let str = `
╔┈┈┈┈┈┈┈┈┈┈┈┈┈
╎❒ *Name:* ${name}
╎❒ *Date:* ${date}
╚┈┈┈┈┈┈┈┈┈┈┈┈┈
╔┈┈┈┈┈┈┈┈┈┈┈┈┈
╎❒ *Bot:* ${botname}
╎❒ *Prefix:* ｢ ${usedPrefix} 」
╎❒ *Uptime:* ${uptime}
╚┈┈┈┈┈┈┈┈┈┈┈┈┈
╔┈┈┈┈┈┈┈┈┈┈┈┈┈
╎┏━━『 *List Menu* 』
╎┃ ❒ .economymenu
╎┃ ❒ .stickermenu
╎┃ ❒ .groupmenu
╎┃ ❒ .animemenu
╎┃ ❒ .logomenu
╎┃ ❒ .toolmenu
╎┃ ❒ .ownermenu
╎┃ ❒ .makermenu
╎┃ ❒ .enable
╎┃ ❒ .menu2
╎┃ ❒ .botmenu
╎┃ ❒ .funmenu
╎┃ ❒ .gamemenu
╎┃ ❒ .dlmenu
╎┃ ❒ .aimenu
╎┃ ❒ .list
╎┗━━━━━━━━━━━
╚┈┈┈┈┈┈┈┈┈┈┈┈┈
© Izumie

> 💡 *_Remember, when in doubt, use ${usedPrefix}list or ${usedPrefix}help2. It's like my magic spell book!_* 💡
`
    
   conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, null, canal)
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu2', 'help2'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
    
function ucapan() {
    return "Hello!"
}
