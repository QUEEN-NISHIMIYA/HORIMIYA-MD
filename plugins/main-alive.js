let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Sound
  let name = m.pushName || conn.getName(m.sender)
  var vn = 'https://cdn.jsdelivr.net/gh/QUEEN-NISHIMIYA/HORIMIYA-MD@main/Assets/mp3/Karimizhi.mp3'
  let url = 'https://github.com/QUEEN-NISHIMIYA/HORIMIYA-MD'
  let murl = 'https://youtu.be/DibiLc17dh0?si=xp9bQ-_frEyDB1-i'
  let img = 'https://izumie-img.vercel.app/Main/izumie/IZUMIE/3.jpg'
  let con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '918593848438@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  let doc = {
    audio: {
      url: vn,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'Izumie',

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'I AM ALIVE',
        body: 'HoRiMiYa-MD',
        thumbnailUrl: img,
        sourceUrl: 'https://chat.whatsapp.com/Krn1VGvyWqP5brTWbNoZsp',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  }

  await conn.sendMessage(m.chat, doc, { quoted: con })
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i

export default handler
