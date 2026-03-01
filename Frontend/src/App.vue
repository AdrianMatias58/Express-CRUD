<script setup>
import { RouterView } from 'vue-router'
import HearderComp from './components/HearderComp.vue'
</script>
  
<template>
  <HearderComp/>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>