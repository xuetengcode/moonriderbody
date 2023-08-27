const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(express.json({limit: '50mb' }));
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
const httpsOptions = {
    key: fs.readFileSync('./server.pem'),     // Adjust with path to your key
    cert: fs.readFileSync('./server.pem')    // Adjust with path to your cert
};

https.createServer(httpsOptions, app).listen(4000, () => {
    console.log('Server started on port 4000 with HTTPS');
});
