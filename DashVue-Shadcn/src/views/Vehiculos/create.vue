<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { VehiculoServ } from '@/services/Vehiculo.service';

const router = useRouter();

const vehiculo = reactive({
  nro_identificacion: '',
  modelo: '',
  id_categoria: 0,
});

const crear = async () => {
  try {
    await VehiculoServ.CrearVehiculo(vehiculo)
    router.back()
  } catch (error) {
    console.error("Error al crear", error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-6">
    <h2 class="text-xl font-bold">Nuevo Vehículo</h2>

    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
            <label for="modelo" class="text-sm font-medium">Modelo</label>
            <input type="text" id="modelo" v-model="vehiculo.modelo" class="border rounded px-3 py-2 text-sm" />
        </div>
      <div class="flex flex-col gap-1">
        <label for="nro_identificacion" class="text-sm font-medium">Matricula</label>
        <input type="text" id="nro_identificacion" v-model="vehiculo.nro_identificacion" class="border rounded px-3 py-2 text-sm" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="id_categoria" class="text-sm font-medium">Categoría</label>
        <select id="id_categoria" v-model="vehiculo.id_categoria"  
          class="border rounded px-3 py-2 text-sm">
          <option :value="1">Terrestre</option>
          <option :value="2">Marítimo</option>
          <option :value="3">Aéreo</option>
        </select>
      </div>

      <div class="flex gap-2">
        <button @click="router.back()" 
          class="border rounded px-4 py-2 text-sm">
          Cancelar
        </button>
        <button @click="crear"
          class="bg-primary text-primary-foreground rounded px-4 py-2 text-sm">
          Crear Vehículo
        </button>
      </div>
    </div>
  </div>
</template>