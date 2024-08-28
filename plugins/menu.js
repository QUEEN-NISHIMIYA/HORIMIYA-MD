import fetch from 'node-fetch'

// Helper function to fetch the image buffer
const getBuffer = async (url) => {
  try {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    return Buffer.from(buffer)
  } catch (error) {
    console.error('Failed to get buffer', error)
    throw new Error('Failed to get buffer')
  }
}

// Menu command handler
let handler = async (m, { conn, usedPrefix }) => {
  const img = 'https://izumie-img.vercel.app/Main/izumie/HORI-MD/3.jpg' // Replace with your image URL

  // Fetch the image buffer
  const thumbnail = await getBuffer(img)

  // Text message content
  const menuText = "Hello @" + m.sender.split('@')[0] + 
     "! Here is the menu:  \n\n1. Option 1 \n2. Option 2 \n3. Option 3"

  // Sending the message with image and hidden link
  await conn.sendMessage(
    m.chat,
    {
      text: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: 'XeNpAi',
          body: 'HoRiMiYa-MD',
          thumbnail: thumbnail,
          sourceUrl: 'https://chat.whatsapp.com/Krn1VGvyWqP5brTWbNoZsp', // Hidden link
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m } // Reply to the original message
  )
}

handler.tags = ['main']
handler.help = ['menu']
handler.command = /^(menu)$/i
handler.group = true

export default handler
