require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { default: axios } = require('axios');
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

app.post('/checkauth', async(req, res) => {
    const { name, lastname } = req.body
    if (name == 'Сергей' && lastname == 'Горбачев') {
        res.status(200).send({ message: 'Авторизация успешна' });
    } else {
      res.status(401).send({ message: 'Неверные данные пользователя' }); // 401 Unauthorized
    }
  });

app.get('/getdata', async(req,res) => {
    try {
        const response = await axios.get('https://apidata.mos.ru/v1/datasets/2681/rows?api_key=df531151-88ec-44f8-89e4-c6fd441030f7');
        res.send({data: response.data})
    } catch(error) {
        console.log(error)
    }
})
// function getData() {
//     const fileData = fs.readFileSync('src/assets/rows.json', 'utf-8');
//     console.log(fileData)
// }
// getData()

server.listen(PORT, () => {
    console.log(`Сервер зпущен на порту ${PORT}`)
})
