import fetch from 'node-fetch'
import puppeteer from 'puppeteer'
import displayLoadingScreen from '../lib/loading.js'

let handler = async (m, { conn, text }) => {
  if (!text) {
    console.log('No song name provided.')
    throw `*Please enter a song name*`
  }

  m.react('🎶')

  let pp = 'https://wallpapercave.com/wp/wp7932387.jpg'
  
  // Scrape Spotifydown for the download link
  let downloadLink = await scrapeSpotifydown(text)

  if (!downloadLink) {
    throw `*Unable to retrieve download link for the song: ${text}*`
  }

  let doc = {
    audio: {
      url: downloadLink,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: `${text}.mp3`,

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: `Now playing: ${text}`,
        body: `Download from Spotifydown`,
        thumbnailUrl: pp,
        sourceUrl: downloadLink,
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
  }

  await conn.sendMessage(m.chat, doc, { quoted: m })
}

async function scrapeSpotifydown(songName) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Spotifydown
    await page.goto('https://spotifydown.com');

    // Enter the song name or Spotify URL
    await page.type('#input-url', songName);

    // Submit the form to search
    await page.click('#submit');

    // Wait for the result to load and display the download link
    await page.waitForSelector('.download-button', { timeout: 60000 });

    // Get the download URL
    const downloadLink = await page.$eval('.download-button', el => el.href);

    await browser.close();
    return downloadLink;
  } catch (err) {
    console.error('Error scraping Spotifydown:', err);
    return null;
  }
}

handler.help = ['spotify']
handler.tags = ['downloader']
handler.command = /^(spotify|song)$/i

export default handler
