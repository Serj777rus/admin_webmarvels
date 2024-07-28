require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs')
// const axios = require('axios');
// const nodeMailer = require('nodemailer')

const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: '*'
}));

function getData() {
    const fileData = fs.readFileSync('src/assets/rows.json', 'utf-8');
    console.log(fileData)
}
getData()

server.listen(PORT, () => {
    console.log(`Сервер зпущен на порту ${PORT}`)
})
