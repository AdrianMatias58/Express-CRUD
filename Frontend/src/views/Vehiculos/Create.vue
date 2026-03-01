<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VehiculsoServ } from '../../services/VehiculosServ.js';

const router = useRouter();

// Objeto reactivo con los nombres exactos que espera tu backend
const formulario = ref({
  modelo: '',
  nro_identificacion: ''
});

const guardar = async () => {
  if (!formulario.value.modelo || !formulario.value.nro_identificacion) {
    alert("Ambos campos son obligatorios");
    return;
  }

  try {
    // Enviamos el JSON "incompleto" (solo los 2 campos)
    await VehiculsoServ.createVehiculos(formulario.value);
    
    // Si el backend responde con éxito, volvemos a la tabla
    router.push('/vehiculos');
  } catch (error) {
    alert("Error al guardar el vehículo. Revisa la consola.");
  }
};
</script>

<template>
  <div class="p-8 bg-[#0f172a] min-h-screen text-slate-300">
    <div class="max-w-xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-slate-800 shadow-2xl">
      <h2 class="text-2xl font-bold text-white mb-6">Nueva Unidad</h2>
      
      <form @submit.prevent="guardar" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-2">Modelo</label>
          <input 
            v-model="formulario.modelo" 
            type="text" 
            class="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Ej. Scania R500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-400 mb-2">Nro. Identificación</label>
          <input 
            v-model="formulario.nro_identificacion" 
            type="text" 
            class="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
            placeholder="PLACA-123"
          >
        </div>

        <div class="flex gap-4 pt-4">
          <button 
            type="submit"
            class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
          >
            Confirmar Registro
          </button>
          
          <router-link 
            to="/vehiculos"
            class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
          >
            Cancelar
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>