const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.post('/save-logs', (req, res) => {
    const logs = req.body.logs.join('\n');
    fs.appendFile('logs.txt', logs, (err) => {
        if (err) throw err;
        console.log('Logs saved to logs.txt');
        res.send('Logs saved.');
    });
});

app.get('/test', (req, res) => {
    res.send('Server is working');
});

app.listen(4000, () => {
    console.log('Server started on port 4000 with HTTP');
});