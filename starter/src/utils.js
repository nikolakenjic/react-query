import axios from 'axios';

const fetchUrl = axios.create({
  baseURL: 'http://localhost:5000/api/tasks',
});

export default fetchUrl;
