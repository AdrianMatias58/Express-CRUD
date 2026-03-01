<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importamos el hook para navegación programática
import { VehiculsoServ } from '../../services/VehiculosServ.js'; 

const router = useRouter(); // Instanciamos el router
const vehiculos = ref([]);
const loading = ref(true);

const fetchVehiculos = async () => {
  loading.value = true;
  try {
    // Asegúrate que en VehiculosServ.js la función se llame TodosgetVehiculos
    const data = await VehiculsoServ.TodosgetVehiculos();
    vehiculos.value = data;
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  } finally {
    loading.value = false;
  }
};
const cambiarEstado = async (vehiculo) => {
  try {
    const nuevoEstado = vehiculo.estado === 1 ? 0 : 1; // Alterna el estado
    await VehiculsoServ.updateEstadoVehiculo(vehiculo.id,nuevoEstado);
    if(VehiculsoServ) fetchVehiculos(); 
  } catch (error) {
    alert("Error al actualizar");
  }
};
const eliminarVehiculo = async (v) => {
  console.log(v);
  
  if (confirm("¿Estás seguro de eliminar este vehículo?")) {
    try {
      await VehiculsoServ.deleteVehiculo(v.id);
      if(VehiculsoServ) fetchVehiculos(); 
    } catch (error) {
      alert("Error al eliminar el vehículo");
    }
  }
};
onMounted(fetchVehiculos);
</script>

<template>
  <div class="p-8 bg-[#0f172a] min-h-screen text-slate-300">
    <div class="max-w-7xl mx-auto flex justify-between items-end mb-10">
      <div>
        <h2 class="text-4xl font-black text-white tracking-tight">Flota de Vehículos</h2>
        <p class="text-slate-500 font-medium">Panel de administración de unidades registradas</p>
      </div>
      
      <router-link 
        to="/vehiculos/create"
        class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 inline-block"
      >
        + Registrar Unidad
      </router-link>
    </div>

    <div class="max-w-7xl mx-auto bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-800/40 text-slate-400 text-[11px] uppercase tracking-[0.2em] border-b border-slate-700">
            <th class="px-8 py-5">Modelo</th>
            <th class="px-8 py-5">Nro. Identificación</th>
            <th class="px-8 py-5">Estado Operativo</th>
            <th class="px-8 py-5 text-right">Gestión</th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-slate-800/50">
          <tr v-if="loading" v-for="i in 3" :key="'loader-' + i" class="animate-pulse">
            <td colspan="4" class="px-8 py-6"><div class="h-5 bg-slate-700/50 rounded-lg w-full"></div></td>
          </tr>

          <tr v-for="v in vehiculos" :key="v.id" class="hover:bg-slate-700/20 transition-all group">
            <td class="px-8 py-5">
              <span class="text-white font-semibold group-hover:text-indigo-400 transition-colors">
                {{ v.modelo }}
              </span>
            </td>
            
            <td class="px-8 py-5 font-mono text-sm tracking-tighter">
              {{ v.nro_identificacion }}
            </td>

            <td class="px-8 py-5">
              <div 
                :class="v.estado ? 'text-emerald-400' : 'text-rose-400'"
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              >
                <span :class="v.estado ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-rose-400'" class="w-2 h-2 rounded-full"></span>
                {{ v.estado ? 'disponible para envio' : 'no disponible' }}
              </div>
            </td>

            <td class="px-8 py-5 text-right">
              <div class="flex justify-end items-center gap-4">
                <button 
                  @click="eliminarVehiculo(v)"
                  class="text-slate-500 hover:text-white transition-colors text-sm font-medium"
                >
                    Eliminar
                </button>
                <div class="w-[1px] h-4 bg-slate-700"></div>
                <button 
                  @click="cambiarEstado(v)"
                  class="text-slate-500 hover:text-rose-500 transition-colors text-sm font-medium">
                    cambiar estado
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && vehiculos.length === 0">
            <td colspan="4" class="px-8 py-20 text-center">
              <p class="text-slate-500 italic">No se encontraron vehículos en el sistema.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>