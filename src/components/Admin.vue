<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="form" v-if="isAuth == false">
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
  </div> -->
  <div class="page">
    <button @click="getData">Получить данные</button>
    <div class="result">Получено {{ dataArr.length }} записей</div>
    <button @click="postMail(this.testData)">Запустить рассылку</button>
    <div>{{ status }}</div>
    <div class="table">
      <table style="width: 600px; background: #333; padding: 24px;">
        <tr style="width: 100%; display: flex; flex-direction: column; justify-content: center;">
          <td style="color: #333; font-weight: 900; padding: 12px; background: #fff; border: none; box-sizing: border-box;">Профессиональная WEB и мобильная разработка<br>"WEB Marvels"</td>
          <td><img src="../assets/photos/phone.jpg" style="width: 100%; object-fit: cover;"></td>
          <td style="width: 100%; padding: 24px 12px; text-align: start; background: #fff; color: #333; box-sizing: border-box;">Добрый день {{ testData.chiefname }}.<br><br>Меня зовут Сергей и я являюсь профессиональным Web разработчиком.
          <br>Дочитайте это письмо до конца, внизу будет приятный бонус
          <br><br>В современном мире все решают технологие и их интеграция в нашу поседневную жизнь</td>
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
      isAuth: true,
      form: {
        name: '',
        lastname: ''
      },
      message: '',
      dataArr: [],
      testData: {
        chiefname: 'Сергей Владимирович',
        orgname: 'ЖСК МОЛОДЕЖЬ ТЕАТРОВ',
        email: 'gvsergey89@gmail.com'

      },
      status: ''
    }
  },
  methods: {
    async checkAuth() {
      try {
        const response = await axios.post('http://192.168.0.102:3000/checkauth', this.form);
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
        const response = await axios.get('http://192.168.1.160:3000/getdata');
        console.log(response.data.data)
        const data = response.data.data;
        data.forEach(el => {
          let newObj = {
            chiefname: '',
            orgname: '',
            email: ''
          }
          newObj.chiefname = el.Cells.ChiefName;
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
        console.log(this.dataArr)
      } catch(error) {
        console.log(error)
      }
    },
    async postMail(arr) {
      try {
        const response = await axios.post('http://192.168.1.160:3000/sends', arr);
        if (response.status == 200) {
          this.status = 'Рассылка запущена'
        } else {
          this.status = response.status;
        }
      } catch(error) {
        console.log(error)
      }
    }
  },
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
