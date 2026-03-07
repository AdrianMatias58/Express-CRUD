<script setup lang="ts">
import HeaderGenerico from './components/ui/Genericos/HeaderGenerico.vue';

</script>

<template>
    <div class="min-h-screen flex flex-col">
    <HeaderGenerico/>
    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
