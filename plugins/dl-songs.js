import fetch from 'node-fetch'
import displayLoadingScreen from '../lib/loading.js'
let res = `https://your-server.com/deezersearch?query=${query}`;
let spurl = await fetch(res);
spurl = await spurl.json();

// Use the preview URL instead of the download URL (if no direct download available)
let sturl = spurl.preview;

let doc = {
  audio: {
    url: sturl, // Deezer preview URL
  },
  mimetype: 'audio/mpeg',
  ptt: true,
  waveform: [100, 0, 100, 0, 100, 0, 100],
  fileName: 'Izumie.mp3',

  contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
      title: '↺ |◁   II   ▷|   ♡',
      body: `Now playing: ${text}`,
      thumbnailUrl: spurl.thumbnail,
      sourceUrl: spurl.url, // Deezer track link
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  },
};

await conn.sendMessage(m.chat, doc, { quoted: m });

}
handler.help = ['spotify']
handler.tags = ['downloader']
handler.command = /^(spotify|song)$/i

export default handler
