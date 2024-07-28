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
    Hi
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
      message: ''
    }
  },
  methods: {
    checkAuth() {
      try {
        const response = axios.post('http://192.168.0.102:3000/checkauth', this.form);
        if (response.status == 200) {
          this.isAuth = true
        } else {
          this.message = 'Неверные данные пользователя'
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
