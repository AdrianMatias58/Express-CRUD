<script setup lang="ts">
import { ref, onMounted } from "vue";
import type InterVehiculo from "@/Interfaces/InterVehiculo";
import { VehiculoServ } from "@/services/Vehiculo.service"; 
import type { ColumnConfig } from "@/components/ui/Genericos/tabla/Type"; 
import TablaGeneriaca from "@/components/ui/Genericos/tabla/TablaGeneriaca.vue"; 
const vehiculos = ref<InterVehiculo[]>([]);
const cargando = ref(true);
const columnasVehiculos: ColumnConfig<InterVehiculo>[] = [
  { key: 'modelo', header: 'Modelo' },
  { key: 'nro_identificacion', header: 'Nro. Identificación' },
  { key: 'estado', header: 'Estado' },
  { key: 'nombre_categoria', header: 'Categoría' },
  { key: 'actions', header: 'Acciones' }
];
const CargarDatos = async () => {
  try {
    cargando.value = true;
    const res = await VehiculoServ.AllVehiculos();
    vehiculos.value = res;
  } catch (error) {
    console.error("Error al obtener vehiculos", error);
  }finally {
    cargando.value = false;
  }
};
onMounted(CargarDatos);
</script>

<template>
    <div>
        <TablaGeneriaca :data="vehiculos" :columns="columnasVehiculos"/>
    </div>
</template>

<style scoped></style>
