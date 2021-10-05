<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script>
  import Header from './components/Header'

export default {
  components: {
      Header
  }
}
</script>

<style>
  .active {
    color: #846c5a;
  }
</style>
