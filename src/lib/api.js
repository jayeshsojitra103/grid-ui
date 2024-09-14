import axios from 'axios';

const API_URL = process.env.REACT_APP_GEO_DB_API_URL;
const API_KEY = process.env.REACT_APP_GEO_DB_API_KEY;

const getPlaces = async (query = '', limit = 5, page = 1) => {
  const offset = (page - 1) * limit;
  const options = {
    method: 'GET',
    url: API_URL,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    },
    params: {
      namePrefix: query,
      limit,
      offset
    }
  };

  try {
    
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { getPlaces };
