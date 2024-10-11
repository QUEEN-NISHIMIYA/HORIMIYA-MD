const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape song data from a given Deezer URL
async function scrapeDeezer(url) {
    try {
        // Fetch the HTML content from the Deezer URL
        const response = await axios.get(url);
        
        // Check if the response status is OK
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from Deezer. Status code: ${response.status}`);
        }

        // Load the HTML into cheerio for parsing
        const $ = cheerio.load(response.data);
        
        // Extract song details
        const songs = [];
        $('.track-list .track').each((index, element) => {
            const title = $(element).find('.track-name').text().trim();
            const artist = $(element).find('.track-artist').text().trim();
            songs.push({ title, artist });
        });

        // Return the scraped song data
        return songs;

    } catch (error) {
        // Handle errors and exceptions
        console.error('An error occurred while scraping Deezer:', error.message);
        return [];
    }
}

// Example usage
const deezerUrl = 'https://www.deezer.com/playlist/your_playlist_id'; // Replace with a valid Deezer playlist URL
scrapeDeezer(deezerUrl)
    .then(songs => {
        if (songs.length > 0) {
            console.log('Scraped Songs:', songs);
        } else {
            console.log('No songs found or an error occurred.');
        }
    })
    .catch(err => {
        console.error('Unexpected error:', err.message);
    });
