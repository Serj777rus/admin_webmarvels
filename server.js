require('dotenv').config();
const http = require('http');
// const https = require('https');
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const nodeMailer = require('nodemailer');
// const fs = require('fs');

// const allowedOrigins = ['https://webmarvels.ru', 'https://www.webmarvels.ru', 'https://admin.webmarvels.ru', 'https://www.admin.webmarvels.ru'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//     optionsSuccessStatus: 204 // для поддержки старых браузеров
// };

// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/webmarvels.ru-0001/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/webmarvels.ru-0001/fullchain.pem')
// };

const PORT = 3000;
const app = express();
const server = http.createServer(app);
// const server = https.createServer(options, app);

let mailerConfig = nodeMailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 's.gorbachev@webmarvels.ru',
        pass: 'Ft6VwK1jNBbPC63sbxzC'
    }
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: '*'
}));

// app.use(cors(corsOptions));
// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(204);
// });

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
                    html: `<!DOCTYPE html>
                                <html>
                                <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Email Template</title>
                                </head>
                                <body style="background-color: #f6f6f6; margin: 0; padding: 0;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                        <td align="center" style="padding: 24px; background: #333;">
                                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #fff;">
                                            <tr>
                                                <td align="center" style="color: #333; font-weight: 900; padding: 12px; background: #fff;">
                                                Профессиональная WEB и мобильная разработка<br>"WEB Marvels"
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="https://drive.google.com/uc?export=view&id=19QU9P9hfNxILuqFslFz27sM9jGL23b8N" style="width: 100%; object-fit: cover;" alt="Phone Image"></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 100%; padding: 24px 12px; text-align: start; background: #fff; color: #333; box-sizing: border-box;">
                                                Добрый день ${el.chiefname}.<br><br>
                                                Меня зовут Сергей и я являюсь профессиональным Web разработчиком.<br>
                                                Дочитайте это письмо до конца, так там будет приятный бонус для Вас &#127873;<br><br>
                                                В современном мире все решают технологии и их интеграция в нашу повседневную жизнь, а скорость взаимодействия с вашими клиентами может играть решающую роль.<br><br>
                                                Для сферы деятельности вашей организации я разработал комплексное предложение, которое сможет закрыть все Ваши потребности и боли, а также Ваших клиентов &#128077;
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px; background: #fff; color: #333; font-size: 24px; font-weight: 900;">
                                                Что же именно я предлагаю:
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 100%; padding: 12px; background: #fff; box-sizing: border-box;">
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                    <td width="50%" style="padding: 12px;"><img src="https://drive.google.com/uc?export=view&id=17Z_tNOWYmjYp9ipOPrePaaaFyM_VO3mW" style="width: 100%; object-fit: cover; border-radius: 16px; box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .3);" alt="Web Development"></td>
                                                    <td width="50%" style="padding: 12px; text-align: start; line-height: 100%; font-weight: 600;">
                                                        Разработку современного Web сайта для вашей ${el.orgname}<br><br>
                                                        <span style="font-size: 12px; font-weight: 400;">Современный сайт поможет вашей управляющей компании наиболее подробно и эффективно рассказать вашим клиентам о вашей деятельности и услугах</span>
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                    <td width="50%" style="padding: 12px; text-align: start; line-height: 100%; font-weight: 600;">
                                                        Разработку современного мобильного приложения в дополнение к сайту<br><br>
                                                        <span style="font-size: 12px; font-weight: 400;">Наличие мобильного приложения поможет Вам охватить большее количество пользователей и взаимодействовать с Вами намного эффективнее</span>
                                                    </td>
                                                    <td width="50%" style="padding: 12px;"><img src="https://drive.google.com/uc?export=view&id=1pxUL88RGUxtAKcyO2nSAGIxs7aJX8nDZ" style="width: 100%; object-fit: cover; border-radius: 16px; box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .3);" alt="Mobile App"></td>
                                                    </tr>
                                                    <tr>
                                                    <td width="50%" style="padding: 12px;"><img src="https://drive.google.com/uc?export=view&id=1MCvA8empIj2H3DYYyEb0NZ6ZTjusuU9W" style="width: 100%; object-fit: cover; border-radius: 16px; box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .3);" alt="CRM"></td>
                                                    <td width="50%" style="padding: 12px; text-align: start; line-height: 100%; font-weight: 600;">
                                                        Интеграция CRM системы<br><br>
                                                        <span style="font-size: 12px; font-weight: 400;">Качественно интегрированная и настроенная CRM система поможет оптимизировать Ваши бизнес процессы, ускорить документооборот и повысить качество обслуживания</span>
                                                    </td>
                                                    </tr>
                                                </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px; background: #fff; color: #333; font-size: 24px; font-weight: 900;">
                                                Почему Вам это нужно:
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 100%; padding: 12px; background: #fff; box-sizing: border-box;">
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                    <td width="10%" style="font-size: 64px; font-weight: 900;">1</td>
                                                    <td width="90%" style="padding: 12px; font-size: 12px; text-align: start; line-height: 110%;">
                                                        Современный сайт расширяет Ваши возможности как по взаимодействию с клиентами, так и по оказанию услуг населению. На сайте возможны интеграции онлайн заказов услуг и товаров, онлайн консультаций, прием оплат, сбор обратной связи, публикация информации о Вашей деятельности. Возможности сайта могут ограничиваться только Вашей фантазией &#128521;
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                    <td width="10%" style="font-size: 64px; font-weight: 900;">2</td>
                                                    <td width="90%" style="padding: 12px; font-size: 12px; text-align: start; line-height: 110%;">
                                                        Мобильное приложение станет прекрасным дополнением к Вашему основному сайту. В современном мире все больше действий люди совершают с помощью смартфона. Мобильное приложение может охватывать огромный спектр Вашей деятельности. От товаров и услуг до личного кабинета и выставления счетов &#128241;
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                    <td width="10%" style="font-size: 64px; font-weight: 900;">3</td>
                                                    <td width="90%" style="padding: 12px; font-size: 12px; text-align: start; line-height: 110%;">
                                                        CRM система служит для более комфортного взаимодействия внутри вашей компании и с вашими клиентами. С помощью нее можно автоматизировать и ускорить большинство рутинных бизнес процессов &#129518;
                                                    </td>
                                                    </tr>
                                                </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px; background: #fff; color: #333; font-size: 24px; font-weight: 900; text-align: center;">
                                                Бонус
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding: 12px; background: #fff; color: #333;">
                                                <img src="https://drive.google.com/uc?export=view&id=1ndafmLuk5jdYGXW-6fMv73Y34JhnhZsj" style="width: 80%; object-fit: cover; border-radius: 32px; box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .3);" alt="Gift">
                                                <p>При заказе комплекса "Сайт + Приложение + CRM"<br>3 месяца технической поддержки БЕСПЛАТНО!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding: 24px 12px; background: rgba(24, 57, 70, 1); color: #fff; font-size: 16px; font-weight: 900;">
                                                Контакты:
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                    <td align="center" style="padding: 12px;">
                                                        <img src="https://drive.google.com/uc?export=view&id=1r4dryImJBHek-LNbkev9IiitfiVFuxRA" style="width: 24px; object-fit: cover;" alt="WhatsApp"><br>
                                                        <span style="font-size: 12px; font-weight: 200;">+7911 468 28 01</span>
                                                    </td>
                                                    <td align="center" style="padding: 12px;">
                                                        <img src="https://drive.google.com/uc?export=view&id=1ey2OS6MOKule9h6qhqCDvwpm8H7irrMb" style="width: 24px; object-fit: cover;" alt="Telegram"><br>
                                                        <span style="font-size: 12px; font-weight: 200;">@Gorbachev_S_V</span>
                                                    </td>
                                                    <td align="center" style="padding: 12px;">
                                                        <img src="https://drive.google.com/uc?export=view&id=1YJjH0n9NbHMFIq7ucmVBKIGnjpe2EwHu" style="width: 24px; object-fit: cover;" alt="VK"><br>
                                                        <a href="https://vk.com/id693783511" style="text-decoration: none; color: #fff;">VK.com</a>
                                                    </td>
                                                    </tr>
                                                </table>
                                                </td>
                                            </tr>
                                            </table>
                                        </td>
                                        </tr>
                                </table>
                            </body>
                    </html>`
                });
                console.log(result.response);
                count++;
            } catch (error) {
                console.error('Error sending email:', error);
                anticount++;
            }
            await delay(60000);
    }
    res.send({ status: 'Успешно'});
    count = 0;
    anticount = 0
})
server.listen(PORT, () => {
    console.log(`Сервер зпущен на порту ${PORT}`)
})
