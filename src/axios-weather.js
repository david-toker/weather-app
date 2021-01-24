import axios from 'axios';

const instance = axios.create({
    baseURL: '//dataservice.accuweather.com/'
});

export default instance;