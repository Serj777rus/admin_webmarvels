<template>
  <div class="quiz-panel">
    <div class="quiz-panel_main">
      <div class="quiz-panel__title">
        <p>ОПРОС</p>
        <span>
          Дорогие клиенты, пройдите пожалуйста опрос на тему качества нашей работы и ассортимента.<br>
          В конце теста Вас ждет приятный сюрприз за прохождение
        </span>
        <button v-if="isActive === null" @click="count">Пройти тест</button>
      </div>
      <div class="quiz_slides">
        <div class="quiz_slide_border" :class="{active: isActive === 1}">
          <div class="quiz_slide_main">
            <p>Что вам не нравится в текущем опыте покупке одежды?</p>
            <div class="slide_checkboxes">
              <div class="inputs">
                <input type="checkbox" id="checkbox1" name="checkbox" value="Сложности с размером">
                <p>Сложности с размером</p>
              </div>
              <div class="inputs">
                <input type="checkbox" id="checkbox2" name="checkbox" value="Качество ткани">
                <p>Качество ткани</p>
              </div>
              <div class="inputs">
                <input type="checkbox" id="checkbox3" name="checkbox" value="Сервис">
                <p>Сервис</p>
              </div>
              <div class="inputs">
                <input type="checkbox" id="checkbox4" name="checkbox" value="Ассортимент">
                <p>Ассортимент</p>
              </div>
            </div>
            <button class="slides_btn" @click="count">Далее</button>
          </div>
        </div>
        <div class="quiz_slide_border" :class="{active: isActive === 2}">
          <div class="quiz_slide_main">
            <p>На сколько вы довольны ассортиментом в нашем магазине?</p>
            <div class="slide_checkboxes">
              <div class="inputs">
                <input type="checkbox" id="checkbox1" name="checkbox" value="Очень доволен(а)">
                <p>Очень доволен(а)</p>
              </div>
              <div class="inputs">
                <input type="checkbox" id="checkbox2" name="checkbox" value="В целом устраивает, но хотелось бы больше выбора">
                <p>В целом устраивает, но хотелось бы больше выбора</p>
              </div>
              <div class="inputs">
                <input type="checkbox" id="checkbox3" name="checkbox" value="Не совсем доволен(а), хотелось бы больше новинок">
                <p>Не совсем доволен(а), хотелось бы больше новинок</p>
              </div>
            </div>
            <button class="slides_btn" @click="count">Далее</button>
          </div>
        </div>
        <div class="quiz_slide_border" :class="{active: isActive === 3}">
          <div class="quiz_slide_main">
            <img src="../assets/photos/cong.png">
            <p>Спасибо за ответы</p>
            <span>Мы отправили подарок вам на почту</span>
            <button class="slides_btn" @click="count">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: null,
      divArr: null
    }
  },
  methods: {
    count() {
      if (this.isActive === null) {
        this.isActive = 1
      }
      else if (this.isActive === this.divArr) {
        this.isActive = null
      } else {
        this.isActive++;
      }
    }
  },
  mounted() {
    this.divArr = document.querySelectorAll('.quiz_slide_border').length;
    console.log(this.divArr);
  }
}
</script>

<style scoped>
.quiz-panel {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  background: #fbfbfb;
}
.quiz-panel_main {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px 16px;
  gap: 40px;
}
.quiz-panel__title {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.quiz-panel__title p {
  color: #333;
  font-weight: bold;
  font-size: 48px;
  margin: 0;
  line-height: 100%;
}
.quiz-panel__title span {
  font-size: 12px;
  text-align: center;
}
.quiz-panel__title button {
  padding: 12px 32px;
  background: #333;
  color: #fbfbfb;
  border: none;
  border-radius: 32px;
}
.quiz_slides {
  width: 100%;
  position: relative;
}

.quiz_slide_border {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid rgba(177, 177, 177, 0.2);
  box-shadow: 0 32px 24px 0 rgba(0, 0, 0, .2);
  position: absolute;
  place-items: center;
  transform: translateX(-3000px);
  transition: all 0.5s ease-in-out 0.3s;
}
.active {
  transform: translateX(0);
}
.quiz_slide_main {
  background: #f3f3f3;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.quiz_slide_main p {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  line-height: 100%;
}
.slide_checkboxes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
}

.inputs {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  background: #fff;
}
.inputs p {
  font-size: 12px;
  text-align: start;
  font-weight: bold;
}
.quiz_slide_main span {
  font-size: 16px;
  margin: 0;
}
.quiz_slide_main img {
  width: 50%;
  object-fit: contain;
}
.slides_btn {
  padding: 12px 32px;
  background: cornflowerblue;
  border: none;
  color: white;
  border-radius: 32px;
  transition: background 300ms ease-in-out;
}
.slides_btn:hover {
  background: #4040a8;
}
</style>