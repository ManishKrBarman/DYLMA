const express = require('express');
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

app.use(express.static('public'));
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

require('dotenv').config();

PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile('/public/home.html', { root: __dirname });
});

app.get('/calculate', (req, res) => {
    res.sendFile('/public/calculate.html', { root: __dirname });
});
app.get('/propose', (req, res) => {
    res.sendFile('/public/card.html', { root: __dirname });
});
app.get('/chat', (req, res) => {
    res.sendFile('/public/chat.html', { root: __dirname });
});



app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});