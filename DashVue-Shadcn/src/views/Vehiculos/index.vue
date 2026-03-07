<script setup lang="ts">
import { ref, onMounted } from "vue";
import type InterVehiculo from "@/Interfaces/InterVehiculo";
import { VehiculoServ } from "@/services/Vehiculo.service"; 
import type { ColumnConfig } from "@/components/ui/Genericos/tabla/Type"; 
import TablaGeneriaca from "@/components/ui/Genericos/tabla/TablaGeneriaca.vue"; 
import { Button } from "@/components/ui/button";          
import { Eye, Pencil, Trash2 } from "lucide-vue-next";   
import CardGenerica from "@/components/ui/Genericos/carta/CardGenerica.vue";
const vehiculos = ref<InterVehiculo[]>([]);
const cargando = ref(true);
const vDisponible = ref<InterVehiculo | null>(null);
const vMantenimiento = ref<InterVehiculo | null>(null);
const vDescontinuado = ref<InterVehiculo | null>(null);
const columnasVehiculos: ColumnConfig<InterVehiculo>[] = [
  { key: 'modelo', header: 'Modelo'},
  { key: 'nro_identificacion', header: 'Nro. Identificación'},
  { key: 'estado', header: 'Estado' },
  { key: 'nombre_categoria', header: 'Categoría' },
  { key: 'actions', header: 'Acciones',  class: 'w-[90px] text-center'},
];
const verDetalle = (vehiculo: InterVehiculo) => console.log("Ver", vehiculo);
const editar = (vehiculo: InterVehiculo) => console.log("Editar", vehiculo);
const eliminar = (vehiculo: InterVehiculo) => console.log("Eliminar", vehiculo);
const CargarTodo = async () => {
  try {
    cargando.value = true;
    const [todos, disponible, mantenimiento, descontinuado] = await Promise.all([
      VehiculoServ.AllVehiculos(),
      VehiculoServ.VehiculoEstado('Disponible'),
      VehiculoServ.VehiculoEstado('Mantenimiento'),
      VehiculoServ.VehiculoEstado('Descontinuado'),
    ]);

    vehiculos.value     = todos;
    vDisponible.value   = disponible[0]    ?? null;
    vMantenimiento.value= mantenimiento[0] ?? null;
    vDescontinuado.value= descontinuado[0] ?? null;

  } catch (error) {
    console.error("Error al cargar datos", error);
  } finally {
    cargando.value = false;
  }
};

onMounted(CargarTodo);

</script>

<template>
  <div class="flex flex-col gap-6 p-4">
    <div class="flex flex-row gap-2">
      <CardGenerica :data="vDisponible ? [vDisponible] : []">
        <template #titulo="{ item }">🟢 {{ item.nro_identificacion }}</template>
        <template #descripcion="{ item }">{{ item.modelo }}</template>
        <template #contenido="{ item }">
          <div class="flex flex-col gap-2 text-sm">
            <span>{{ item.nombre_categoria }}</span>
            <span>📅 {{ item.fecha_actualizacion }}</span>
            <span class="text-green-500">● {{ item.estado }}</span>
          </div>
        </template>
      </CardGenerica>
  
      <CardGenerica :data="vMantenimiento ? [vMantenimiento] : []">
        <template #titulo="{ item }">🟡 {{ item.nro_identificacion   }}</template>
        <template #descripcion="{ item }">{{ item.modelo }}</template>
        <template #contenido="{ item }">
          <div class="flex flex-col gap-2 text-sm">
            <span>{{ item.nombre_categoria }}</span>
            <span>📅 {{ item.fecha_actualizacion }}</span>
            <span class="text-yellow-500">● {{ item.estado }}</span>
          </div>
        </template>
      </CardGenerica>
      <CardGenerica :data="vDescontinuado ? [vDescontinuado] : []">
        <template #titulo="{ item }">🔴 {{item.nro_identificacion  }}</template>
        <template #descripcion="{ item }">{{ item.modelo }}</template>
        <template #contenido="{ item }">
          <div class="flex flex-col gap-2 text-sm">
            <span>{{ item.nombre_categoria }}</span>
            <span>📅 {{ item.fecha_actualizacion  }}</span>
            <span class="text-red-500">● {{ item.estado }}</span>
          </div>
        </template>
      </CardGenerica>
    </div>
    <div class="w-full">
      <TablaGeneriaca :data="vehiculos" :columns="columnasVehiculos">
        <template #cell-actions="{ row }" class="w-100">
          <div class="flex gap-1 justify-center">
            <Button variant="default" size="sm" @click="verDetalle(row)">
              <Eye class="w-3 h-3"  />
            </Button>
            <Button variant="secondary" size="sm" @click="editar(row)">
              <Pencil class="w-4 h-4" />
            </Button>
            <Button variant="destructive" size="sm" @click="eliminar(row)">
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </template>
      </TablaGeneriaca>
    </div>
  </div>
</template>