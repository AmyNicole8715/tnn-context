import axios from 'axios';
import { YOUTUBE_API_KEY } from './key';

const KEY = YOUTUBE_API_KEY;


export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    type: 'video',
    maxResults: 1,
    key: KEY,
  },
});