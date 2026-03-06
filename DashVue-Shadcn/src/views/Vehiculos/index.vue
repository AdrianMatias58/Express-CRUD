<script setup lang="ts">
import { ref, onMounted } from "vue";
import type InterVehiculo from "@/Interfaces/InterVehiculo";
import { VehiculoServ } from "@/services/Vehiculo.service"; 
import type { ColumnConfig } from "@/components/ui/Genericos/tabla/Type"; 
import TablaGeneriaca from "@/components/ui/Genericos/tabla/TablaGeneriaca.vue"; 
import { Button } from "@/components/ui/button";          
import { Eye, Pencil, Trash2 } from "lucide-vue-next";   

const vehiculos = ref<InterVehiculo[]>([]);
const cargando = ref(true);

const columnasVehiculos: ColumnConfig<InterVehiculo>[] = [
  { key: 'modelo', header: 'Modelo' },
  { key: 'nro_identificacion', header: 'Nro. Identificación' },
  { key: 'estado', header: 'Estado' },
  { key: 'nombre_categoria', header: 'Categoría' },
  { key: 'actions', header: 'Acciones' },
];

const verDetalle = (vehiculo: InterVehiculo) => console.log("Ver", vehiculo);
const editar = (vehiculo: InterVehiculo) => console.log("Editar", vehiculo);
const eliminar = (vehiculo: InterVehiculo) => console.log("Eliminar", vehiculo);

const CargarDatos = async () => {
  try {
    cargando.value = true;
    const res = await VehiculoServ.AllVehiculos();
    vehiculos.value = res;
  } catch (error) {
    console.error("Error al obtener vehiculos", error);
  } finally {
    cargando.value = false;
  }
};

onMounted(CargarDatos);
</script>

<template>
  <div>
    <TablaGeneriaca :data="vehiculos" :columns="columnasVehiculos">
      <template #cell-actions="{ row }">
        <div class="flex gap-2">
          <Button variant="default" size="sm" @click="verDetalle(row)">
            <Eye class="w-4 h-4" />
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
</template>