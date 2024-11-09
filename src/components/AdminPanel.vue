
<template>
  <div class="admin">
   <div class="header">
     <div class="header_main">
       <div class="logo">
         <img src="../assets/photos/logo.png">
         <p>Моя рассылка</p>
       </div>
       <div class="user">
         <div class="avatar">
           <p>RG</p>
         </div>
         <div class="user_name">
           <p>Раян Гослинг</p>
           <p>rj@gmail.com</p>
         </div>
       </div>
     </div>
   </div>
    <div class="boards">
      <div class="board_main">
        <div class="board">
          <div class="left_side_board">
            <img src="../assets/photos/sended.png">
            <p>Отправлено email</p>
            <span>5 192</span>
          </div>
          <div class="right_side_board">
            <div class="dotted">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="cifr">
              <p>100%</p>
            </div>
          </div>
        </div>
        <div class="board">
          <div class="left_side_board">
            <img src="../assets/photos/clients.png">
            <p>Всего клиентов</p>
            <span>2 980</span>
          </div>
          <div class="right_side_board">
            <div class="dotted">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="cifr">
              <p>100%</p>
            </div>
          </div>
        </div>
        <div class="board">
          <div class="left_side_board">
            <img src="../assets/photos/analitic.png">
            <p>Прирост клиентов</p>
            <span>500%</span>
          </div>
          <div class="right_side_board">
            <div class="dotted">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="cifr">
              <p>100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sendler">
      <div class="sendler_main">
        <h3>Новая рассылка</h3>
        <div class="sendler_block">
          <div class="left_side_sendler_block">
            <div class="inputs">
              <form @submit.prevent="sendMails">
                <textarea v-model="textarea" name="textarea" id="textarea" required placeholder="Код для вставки">

                </textarea>
                <button class="send" type="submit">Запустить</button>
              </form>
              <button @click="viewPrev">Превью</button>
              <h4>Статус рассылки: <span>{{ message }}</span></h4>
            </div>
          </div>
          <div class="right_side_sendler_block">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      textarea: '',
      message: ''
    }
  },
  methods: {
    viewPrev() {
      document.querySelector('.right_side_sendler_block').innerHTML = this.textarea
    },
    async sendMails() {
      try {
        const response = await axios.post('http://192.168.31.68:3000/sends', {html: this.textarea}, {headers: {'Content-Type': 'application/json'}})
        if (response.status === 200) {
          this.message = 'Рассылка запущена'
        }
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.admin {
  width: 100%;
  background: rgb(249, 250, 251);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 80px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  padding: 24px 0;
}

.header_main {
  width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.logo img {
  width: 64px;
  object-fit: contain;
}
.logo p {
  font-size: 24px;
  font-weight: bold;
}
.user {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: brown;
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  line-height: 100%;
  font-weight: bold;
}

.user_name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.user_name p {
  line-height: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  font-weight: bold;
}
.boards {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}
.board_main {
  width: 1280px;
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.board {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 32px;
  background: rgb(255, 255, 255);
  border-radius: 24px;
  border: 1px solid rgba(177, 177, 177, 0.2);
}

.left_side_board {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: start;
}
.left_side_board img {
  width: 64px;
  object-fit: contain;
}
.left_side_board p {
  line-height: 100%;
  font-weight: normal;
  font-size: 18px;
  text-align: start;
}
.left_side_board span {
  font-size: 32px;
  font-weight: bolder;
  line-height: 100%;
}
.right_side_board {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dotted {
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: center;
  align-self: end;
}

.dot {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: darkgray;
}

.cifr {
  display: flex;
  box-sizing: border-box;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgb(239, 253, 244);
}
.cifr p {
  margin: 0;
  font-size: 12px;
  color: chartreuse;
}
.sendler {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.sendler_main {
  width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  padding: 32px;
  background: rgb(255, 255, 255);
  border-radius: 24px;
}
.sendler_main h3 {
  margin: 0;
  font-size: 32px;
  text-align: start;
}
.sendler_block {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
}

.left_side_sendler_block {
  width: 50%;
}

.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.inputs form {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
}
.inputs h4 {
  text-align: start;
  font-size: 24px;
}
.inputs span {
  color: darkgreen;
}
textarea {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  border: 2px solid rgba(177, 177, 177, 0.6);
}
.send {
  color: rgb(255, 255, 255);
  margin: 0;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  background: darkgreen;
}
button {
  color: rgb(255, 255, 255);
  margin: 0;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  background: black;
  align-self: start;
}
.right_side_sendler_block {
}
</style>
