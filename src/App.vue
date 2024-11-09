<template>
  <AdminPanel/>
</template>

<script>
import AdminPanel from './components/AdminPanel.vue'

export default {
  name: 'App',
  components: {
    AdminPanel
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
