<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form" v-if="isAuth == false">
    <form @submit.prevent="checkAuth">
      <div class="inputs">
        <label for="name">Имя</label>
        <input v-model="form.name" type="text" name="name" required>
      </div>
      <div class="inputs">
        <label for="lastname">Фамилия</label>
        <input v-model="form.lastname" type="text" name="lastname" required>
      </div>
      <button type="submit">Войти</button>
      <div>{{ message }}</div>
    </form>
  </div>
  <div class="page" v-else>
    <button @click="getData">Получить данные</button>
    <div class="result">Получено {{ dataArr.length }} записей</div>
    <button @click="postMail(dataArr)">Запустить рассылку</button>
    <div>{{ status }}</div>
    <button @click="getCount">Показать счетчик</button>
    <div>Отправлено: {{ count }}</div>
    <div>Не отправлено: {{ anticouunt }}</div>
    <div class="table">
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
                                                    <a href="https://wa.me/79114682801"><td align="center" style="padding: 12px;">
                                                        <img src="https://drive.google.com/uc?export=view&id=1r4dryImJBHek-LNbkev9IiitfiVFuxRA" style="width: 24px; object-fit: cover;" alt="WhatsApp"><br>
                                                        <span style="font-size: 12px; font-weight: 200;">+7911 468 28 01</span>
                                                    </td></a>
                                                    <a href="https://t.me/Gorbachev_S_V"><td align="center" style="padding: 12px;">
                                                        <img src="https://drive.google.com/uc?export=view&id=1ey2OS6MOKule9h6qhqCDvwpm8H7irrMb" style="width: 24px; object-fit: cover;" alt="Telegram"><br>
                                                        <span style="font-size: 12px; font-weight: 200;">@Gorbachev_S_V</span>
                                                    </td></a>
                                                    <td align="center" style="padding: 12px;">
                                                        <img src="https://drive.google.com/uc?export=view&id=1YJjH0n9NbHMFIq7ucmVBKIGnjpe2EwHu" style="width: 24px; object-fit: cover;" alt="VK"><br>
                                                        <a href="https://vk.com/id693783511" style="text-decoration: none; font-weight: 400; font-size: 12px; color: #fff;">VK.com</a>
                                                    </td>
                                                    </tr>
                                                </table>
                                                </td>
                                            </tr>
                                            </table>
                                        </td>
                                        </tr>
                                </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      isAuth: false,
      form: {
        name: '',
        lastname: ''
      },
      message: '',
      dataArr: [],
      // testData: [{
      //   chiefname: 'Лилия Рафиковна',
      //   orgname: 'Massage Spa Time',
      //   email: 'lilitopchik1006@gmail'
      // },
      // {
      //   chiefname: 'Сергей Горбачев',
      //   orgname: 'Massage Spa Time',
      //   email: 'gvsergey89@gmail.com'
      // }
      // ],
      status: '',
      count: 0,
      anticouunt: 0
    }
  },
  methods: {
    async checkAuth() {
      try {
        const response = await axios.post('api/checkauth', this.form);
        if (response.status == 200) {
          this.isAuth = true;
        } else {
          this.message = 'Неверные данные пользователя'
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getData() {
      try {
        const response = await axios.get('api/getdata');
        console.log(response.data.data)
        const data = response.data.data;
        data.forEach(el => {
          let newObj = {
            chiefname: '',
            orgname: '',
            email: ''
          }
          newObj.chiefname = el.Cells.ChiefName;
          let str = newObj.chiefname.split(' ').slice(1);
          let processedWord = str.map(word => word.charAt(0) + word.slice(1).toLocaleLowerCase());
          newObj.chiefname = processedWord.join(' ');
          newObj.orgname = el.Cells.ShortName;
          if (Array.isArray(el.Cells.Email)) {
            for (let mail of el.Cells.Email) {
              newObj.email = mail.Email
              }
          } else {
            newObj.email = ''
          }
          this.dataArr.push(newObj);
        })
        this.dataArr.splice(0, 250);
        console.log(this.dataArr)
      } catch(error) {
        console.log(error)
      }
    },
    async postMail(arr) {
      try {
        const response = await axios.post('api/sends', arr);
        if (response.status == 200) {
          this.status = 'Рассылка запущена'
        } else {
          this.status = response.status;
        }
      } catch(error) {
        console.log(error)
      }
    },
    async getCount() {
      const response = await axios.get('api/getCount')
      console.log(response.data)
      this.count = response.data.data.ok;
      this.anticouunt = response.data.data.notok;
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
