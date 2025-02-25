const express = require('express');
const app = express();

app.use(express.static('public'));

require('dotenv').config();

PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile('/public/home.html', { root: __dirname });
});

app.get('/calculate', (req, res) => {
    res.sendFile('/public/wip.html', { root: __dirname });
});
app.get('/propose', (req, res) => {
    res.sendFile('/public/card.html', { root: __dirname });
});
app.get('/chat', (req, res) => {
    res.sendFile('/public/wip.html', { root: __dirname });
});



app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});