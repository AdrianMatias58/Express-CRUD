<script setup>
import { RouterLink } from 'vue-router' // Importante importar esto
</script>

<template>
  <header class="bg-[#1a1a1a] text-white shadow-xl">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      
      <div class="flex items-center">
        <h1 class="text-2xl font-extrabold tracking-tight">
          Asignación de Carga
        </h1>
      </div>

      <nav class="flex items-center space-x-6">
        <RouterLink 
          to="/vehiculos"
          class="flex items-center bg-[#42b883] hover:bg-[#33a06f] text-[#1a1a1a] px-6 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Seccion Vehiculos
        </RouterLink>
      </nav>
    </div>
  </header>
</template>