require('dotenv').config();
// const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const bodyParser = require('body-parser');

const allowedOrigins = ['https://webmarvels.ru', 'https://www.webmarvels.ru', 'https://admin.webmarvels.ru', 'https://www.admin.webmarvels.ru'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    optionsSuccessStatus: 204 // для поддержки старых браузеров
};

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/webmarvels.ru-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/webmarvels.ru-0001/fullchain.pem')
};

const PORT = 3000;
const app = express();
// const server = http.createServer(app);
const server = https.createServer(options, app);

let mailerConfig = nodeMailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 's.gorbachev@webmarvels.ru',
        pass: 'Ft6VwK1jNBbPC63sbxzC'
    }
})
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({
//     credentials: true,
//     origin: '*'
// }));

app.use(cors(corsOptions));
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

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
});

let count = 0;
let anticount = 0;

app.get('/getCount', (req,res) => {
    res.send({data: {ok: count, notok: anticount}});
})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
app.post('/sends', async(req,res) => {
    const data = req.body;
    console.log(data)
    for (let i = 0; i< data.length; i++ ) {
        let el = data[i]
            try {
                let result = await mailerConfig.sendMail({
                    from: '"WEB Marvels" <s.gorbachev@webmarvels.ru>',
                    to: el.email,
                    subject: `Письмо для ${el.chiefname}`,
                    // text: `Добрый день ${orgname}`,
                    html: ``
                });
                console.log(result.response);
                count++;
            } catch (error) {
                console.error('Error sending email:', error);
                anticount++;
            }
            await delay(180000);
    }
    res.send({ status: 'Успешно'});
    count = 0;
    anticount = 0
})
server.listen(PORT, () => {
    console.log(`Сервер зпущен на порту ${PORT}`)
})
