<script setup lang="ts">
import { ref, onMounted } from "vue";
import type InterVehiculo from "@/Interfaces/InterVehiculo";
import { VehiculoServ } from "@/services/Vehiculo.service";
import type { ColumnConfig } from "@/components/ui/Genericos/tabla/Type";
import TablaGeneriaca from "@/components/ui/Genericos/tabla/TablaGeneriaca.vue";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Car,
  Wrench,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-vue-next";
import CardGenerica from "@/components/ui/Genericos/carta/CardGenerica.vue";
import GraficoBarras from "@/components/ui/Genericos/grafico/GraficoBarras.vue";
import type VehiculoEstado from "@/Interfaces/InterVehEstdo";
import { useRouter } from "vue-router";
const router = useRouter()
const vehiculos = ref<InterVehiculo[]>([]);
const vEstado = ref<VehiculoEstado[]>([]);
const cargando = ref(true);
const vDisponible = ref<InterVehiculo | null>(null);
const vMantenimiento = ref<InterVehiculo | null>(null);
const vDescontinuado = ref<InterVehiculo | null>(null);
const vUltimoIngre = ref<InterVehiculo | null>(null);
const vUltimoAct = ref<InterVehiculo | null>(null);

const columnasVehiculos: ColumnConfig<InterVehiculo>[] = [
  { key: "modelo", header: "Modelo" },
  { key: "nro_identificacion", header: "Identificación" },
  { key: "estado", header: "Estado" },
  { key: "nombre_categoria", header: "Categoría" },
  { key: "actions", header: "Acciones", class: "w-[90px] text-center" },
];

const editar = (v: InterVehiculo) => console.log("Editar", v);
const eliminar = async(v: InterVehiculo) => {
  try{
    await VehiculoServ.EliminarVehiculo(v.id_vehiculo)
    CargarTodo() 
  }catch(error){
    console.error("Error al eliminar", error)
  }
};
const crear= () => router.push('/vehiculo-crear')
const CargarTodo = async () => {
  try {
    cargando.value = true;
    const [
      todosVehiculos,
      estados,
      disponible,
      mantenimiento,
      descontinuado,
      ultimoIngre,
      ultimoActual,
    ] = await Promise.all([
      VehiculoServ.AllVehiculos(),
      VehiculoServ.CantiVEstado(),
      VehiculoServ.VehiculoEstado("Disponible"),
      VehiculoServ.VehiculoEstado("Mantenimiento"),
      VehiculoServ.VehiculoEstado("Descontinuado"),
      VehiculoServ.UltimoIngre(),
      VehiculoServ.UltimoActual(),
    ]);

    vehiculos.value = todosVehiculos;
    vEstado.value = estados;
    vDisponible.value = disponible[0] ?? null;
    vMantenimiento.value = mantenimiento[0] ?? null;
    vDescontinuado.value = descontinuado[0] ?? null;
    vUltimoIngre.value = ultimoIngre[0] ?? null;
    vUltimoAct.value = ultimoActual[0] ?? null;
  } catch (error) {
    console.error("Error al cargar datos", error);
  } finally {
    cargando.value = false;
  }
};

onMounted(CargarTodo);
</script>

<template>
  <div class="flex flex-col gap-6 p-6 bg-muted/30 min-h-screen">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Gestión de Vehículos</h1>
        <p class="text-sm text-muted-foreground mt-0.5">
          Resumen del estado actual de la flota
        </p>
      </div>
      <Badge variant="outline" class="text-lg gap-1.5 px-3 py-1.5">
        <span
          class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block text-9xl"
        ></span>
        {{ vehiculos.length }} vehículos en total
      </Badge>
      <Button @click="crear">
        <Plus class="w-4 h-4 mr-1" />
        Nuevo Vehículo
      </Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <CardGenerica :data="vDisponible ? [vDisponible] : []">
        <template #titulo>
          <div class="flex items-center gap-2">
            <div class="p-1.5 rounded-md bg-green-500/10">
              <Car class="w-4 h-4 text-green-500" />
            </div>
            <span class="text-sm font-semibold">Disponible</span>
          </div>
        </template>
        <template #descripcion="{ item }">
          <div class="flex flex-col gap-0.5">
            <span class="text-base font-bold">{{
              item.nro_identificacion
            }}</span>
            <span class="text-sm text-muted-foreground">{{ item.modelo }}</span>
          </div>
        </template>
        <template #contenido="{ item }">
          <div class="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>{{ item.nombre_categoria }}</span>
            <span>{{ item.fecha_actualizacion }}</span>
            <Badge
              class="w-fit mt-1 bg-green-500/10 text-green-600 hover:bg-green-500/20 border-0"
            >
              ● {{ item.estado }}
            </Badge>
          </div>
        </template>
      </CardGenerica>

      <CardGenerica :data="vMantenimiento ? [vMantenimiento] : []">
        <template #titulo>
          <div class="flex items-center gap-2">
            <div class="p-1.5 rounded-md bg-yellow-500/10">
              <Wrench class="w-4 h-4 text-yellow-500" />
            </div>
            <span class="text-sm font-semibold">En Mantenimiento</span>
          </div>
        </template>
        <template #descripcion="{ item }">
          <div class="flex flex-col gap-0.5">
            <span class="text-base font-bold">{{
              item.nro_identificacion
            }}</span>
            <span class="text-sm text-muted-foreground">{{ item.modelo }}</span>
          </div>
        </template>
        <template #contenido="{ item }">
          <div class="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>{{ item.nombre_categoria }}</span>
            <span>{{ item.fecha_actualizacion }}</span>
            <Badge
              class="w-fit mt-1 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-0"
            >
              ● {{ item.estado }}
            </Badge>
          </div>
        </template>
      </CardGenerica>

      <CardGenerica :data="vDescontinuado ? [vDescontinuado] : []">
        <template #titulo>
          <div class="flex items-center gap-2">
            <div class="p-1.5 rounded-md bg-red-500/10">
              <XCircle class="w-4 h-4 text-red-500" />
            </div>
            <span class="text-sm font-semibold">Descontinuado</span>
          </div>
        </template>
        <template #descripcion="{ item }">
          <div class="flex flex-col gap-0.5">
            <span class="text-base font-bold">{{
              item.nro_identificacion
            }}</span>
            <span class="text-sm text-muted-foreground">{{ item.modelo }}</span>
          </div>
        </template>
        <template #contenido="{ item }">
          <div class="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>{{ item.nombre_categoria }}</span>
            <span>{{ item.fecha_actualizacion }}</span>
            <Badge
              class="w-fit mt-1 bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0"
            >
              ● {{ item.estado }}
            </Badge>
          </div>
        </template>
      </CardGenerica>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <GraficoBarras :datos="vEstado" titulo="Distribución por Estado" />
      </div>

      <div class="flex flex-col gap-4">
        <CardGenerica :data="vUltimoIngre ? [vUltimoIngre] : []">
          <template #titulo>
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-md bg-blue-500/10">
                <Clock class="w-4 h-4 text-blue-500" />
              </div>
              <span class="text-sm font-semibold">Último Registrado</span>
            </div>
          </template>
          <template #descripcion="{ item }">
            <span class="font-bold">{{ item.nro_identificacion }}</span>
            <span class="text-sm text-muted-foreground block">{{
              item.modelo
            }}</span>
          </template>
          <template #contenido="{ item }">
            <span class="text-xs text-muted-foreground">{{
              item.nombre_categoria
            }}</span>
          </template>
        </CardGenerica>

        <CardGenerica :data="vUltimoAct ? [vUltimoAct] : []">
          <template #titulo>
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-md bg-purple-500/10">
                <RefreshCw class="w-4 h-4 text-purple-500" />
              </div>
              <span class="text-sm font-semibold">Última Actualización</span>
            </div>
          </template>
          <template #descripcion="{ item }">
            <span class="font-bold">{{ item.nro_identificacion }}</span>
            <span class="text-sm text-muted-foreground block">{{
              item.modelo
            }}</span>
          </template>
          <template #contenido="{ item }">
            <span class="text-xs text-muted-foreground">{{
              item.nombre_categoria
            }}</span>
          </template>
        </CardGenerica>
      </div>
    </div>

    <div class="rounded-lg border bg-card shadow-sm">
      <div class="flex items-center justify-between px-5 py-4 border-b">
        <h2 class="font-semibold text-sm">Listado de Vehículos</h2>
        <span class="text-xs text-muted-foreground"
          >{{ vehiculos.length }} registros</span
        >
      </div>
      <div class="p-4">
        <TablaGeneriaca :data="vehiculos" :columns="columnasVehiculos">
          <template #cell-actions="{ row }">
            <div class="flex gap-1 justify-center">
              <Button variant="secondary" size="sm" @click="editar(row)">
                <Pencil class="w-3.5 h-3.5"/>Editar
              </Button>
              <Button variant="destructive" size="sm" @click="eliminar(row)">
                <Trash2 class="w-3.5 h-3.5"/> Eliminar
              </Button>
            </div>
          </template>
        </TablaGeneriaca>
      </div>
    </div>
  </div>
</template>
