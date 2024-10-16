import fetch from 'node-fetch'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'

const execPromise = promisify(exec)

let handler = async (m, { conn, args }) => {
  let audio = m.quoted ? m.quoted : m
  if (!audio || !audio.isAudio) throw `✳️ Please reply to an audio file`

  // Split input argument using ';' as the delimiter
  if (!args[0] || !args[0].includes(';')) throw `✳️ Enter start and end time in the format start;end`
  let [startTime, endTime] = args[0].split(';').map(time => parseInt(time))
  
  if (isNaN(startTime) || isNaN(endTime)) throw '✳️ Please provide valid time values.'
  if (startTime >= endTime) throw '✳️ The start time must be less than the end time.'
  if (startTime < 0 || endTime < 0) throw '✳️ Time values must be positive.'

  let media = await conn.downloadAndSaveMediaMessage(audio, 'input.mp3')

  try {
    let outputFileName = 'output_cut.mp3'
    await execPromise(`ffmpeg -i ${media} -ss ${startTime} -to ${endTime} -c copy ${outputFileName}`)
    
    await conn.sendFile(m.chat, outputFileName, 'trimmed_audio.mp3', null, m)
    fs.unlinkSync(media) // Clean up input file
    fs.unlinkSync(outputFileName) // Clean up output file
    m.react(done)
  } catch (e) {
    console.error(e)
    m.react(error)
  }
}

handler.help = ['cutaudio <start;end>']
handler.tags = ['tools']
handler.command = ['trim']

export default handler
