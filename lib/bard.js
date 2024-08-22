import axios from 'axios';

const baseurl = 'https://bard.rizzy.eu.org';

class Bard {
    async question({ ask }) {
        if (!ask) throw new Error('Please specify a question!');
        
        try {
            const response = await axios.post(`${baseurl}/api/onstage`, { ask }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }

    async questionWithImage({ ask, image }) {
        if (!ask) throw new Error('Please specify a question!');
        if (!image) throw new Error('Please specify a URL for the image!');
        
        try {
            const response = await axios.post(`${baseurl}/api/onstage/image`, { ask, image }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }
}

export default Bard;
