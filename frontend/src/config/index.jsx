const {default: axios} = require("axios");

export const clientServer = axios.create({
    baseURL: 'https://connectify-4cpk.onrender.com',
});