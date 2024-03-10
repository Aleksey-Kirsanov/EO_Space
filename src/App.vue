<script setup>
import { useTasksStore } from "./stores/TasksStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const taskNumber = 1; // номер задания
const profile = { name: "Anton", points: "1000" }; // пользователь
const store = useTasksStore(); // получение необходимого задания из стора
store.getTask(taskNumber);

// radio answerOptions
const optionsValue = ref(null);

//  модалка help
const isOpenModal = ref(false);
function toggleIsOpenModal() {
  isOpenModal.value = !isOpenModal.value;
}
//  модалка check
const ModalCheck = ref(false);
function isOpenModalCheck() {
  ModalCheck.value = true
}
function isCloseModalCheck() {
  ModalCheck.value = false
  optionsValue.value = null
  
}

const { task } = storeToRefs(store);

//                        реализаци Check через обычный alert
// const checkingResult = () => {
//   if (optionsValue.value == task.value.correctAnswer) {
//     alert("Truly!")
//   } else if (optionsValue.value == null) {
//     alert("Сhoose one of the options!")
//   } else {
//     alert("Wrong!")
//   }
// }

//                        реализаци Check через красивую модалку
const modalTitle = ref('')
const checkingResult = () => {
  if (optionsValue.value == task.value.correctAnswer) {
    modalTitle.value = "Truly!"
    isOpenModalCheck()
  } else if (optionsValue.value == null) {
    modalTitle.value = "Сhoose one of the options!"
    isOpenModalCheck()
  } else {
    modalTitle.value = "Wrong!"
    isOpenModalCheck()
  }
}

</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="row header">
        <div class="profile">
          <div>
            <div class="name">{{ profile.name }}</div>
            <div style="display: flex">
              <div class="points">{{ profile.points }}</div>
              <img class="profile__image" src="../src/assets/images/coin.png" />
            </div>
          </div>
        </div>
        <div class="col side-panel__left">
          <button class="btn__close" @click="console.log('close')"></button>
        </div>
        <div class="col col-9 text">
          <div class="conditions">{{ task.conditions }}</div>
          <div class="text__task">{{ task.text }}</div>
        </div>
        <div class="col side-panel__right">
          <button class="btn__help" @click="toggleIsOpenModal()"></button>
        </div>
      </div>
      <div class="task row align-items-center">
        <img
          class="task__image"
          :src="`../src/assets/images/tasks/task_img_${task.image}.png`"
        />
      </div>
    </div>
    <div class="footer">
      <div class="footer__container row">
        <div class="col">
          <input
            value="A"
            type="radio"
            name="answerOptions"
            v-model="optionsValue"
            :id="task.answerOptions.a"
          >
        </input>
        <label class="btn__options" :for="task.answerOptions.a">
          {{ task.answerOptions.a }}
        </label>
        </div>

        <div class="col">
          <input
            value="B"
            type="radio"
            name="answerOptions"
            v-model="optionsValue"
            :id="task.answerOptions.b"
          >
        </input>
        <label class="btn__options" :for="task.answerOptions.b">
          {{ task.answerOptions.b }}
        </label>
        </div>

        <div class="col">
          <input
            value="C"
            type="radio"
            name="answerOptions"
            v-model="optionsValue"
            :id="task.answerOptions.c"
          >
      
        </input>
        <label class="btn__options" :for="task.answerOptions.c">
          {{ task.answerOptions.c }}
        </label>
        </div>
        <div class="col-2 button__check"><button class="btn__check" @click="checkingResult()">Check</button></div>
      </div>
    </div>
    <div class="modal" :class="{ 'modal--active': isOpenModal }">
      <div class="modal__window">
        <h2 class="modal__window-title">Help</h2>
        <button
          class="btn__close modal-btn__close"
          @click="toggleIsOpenModal()"
        ></button>
      </div>
      <div class="modal__overlay"></div>
    </div>
    <div class="modal" :class="{ 'modal--active': ModalCheck }">
      <div class="modal__window">
        <h2 class="modal__window-title">{{ modalTitle }}</h2>
        <button
          class="btn__close modal-btn__close"
          @click="isCloseModalCheck()"
        ></button>
      </div>
      <div class="modal__overlay"></div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import './assets/styles/variables.sass'
@import './assets/styles/button.sass'
@import './assets/styles/modal.sass'

.row.header
  @media (max-width: 512px)

.side-panel__left, .side-panel__right
  @media (max-width: 512px)
      display: flex

.wrapper
  position: relative

.container
  padding-top: 20px
  height: calc(100vh - 80px)

.col
    text-align: center
    display: flex

.profile
  margin-bottom: 40px
  display: flex
  justify-content: flex-end
  user-select: none

.name
  text-align: center
  margin-bottom: 5px

.points
  margin-right: 5px

.profile__image
  width: 23px
  height: 23px

.text
  user-select: none
  display: block
  @media (max-width: 512px)
        position: absolute
        top: 220px
        left: 50%
        transform: translateX(-50%)

.text__task
  margin-top: 10px
  font-size: 1.3rem

.task
  height: calc(100% - 180px)

.task__image
  max-width: 100%
  max-height: 600px
  @media (max-width: 512px)
    scale: 150%

.footer
    padding: 20px
    background-color: $background-footer

.footer__container
    width: 90vw
    margin: auto


.side-panel__right
    display: flex
    justify-content: flex-end
.btn__help
  width: 40px
  height: 40px
  background-image: url("./assets/images/bulb.png")
  background-position: center
  background-repeat: no-repeat

.btn__close
  width: 40px
  height: 40px
  background-image: url("./assets/images/close_btn.png")
  background-position: center
  background-repeat: no-repeat

.modal-btn__close
  position: absolute
  top: 10px
  right: 10px

.btn__options:hover
  background-color: $options !important
  border: none

.button__check
  @media (max-width: 512px)
    width: 40% !important

.btn__check:hover
  background-color: $check !important
  border: none
.btn__help:hover
  background-color: $help !important
  border: none
.btn__close:hover
  background-color: $close !important
  border: none


</style>
