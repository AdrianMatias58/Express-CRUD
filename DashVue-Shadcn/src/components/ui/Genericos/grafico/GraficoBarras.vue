<!-- components/ui/Genericos/grafico/GraficoBarras.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import type VehiculoEstado from "@/Interfaces/InterVehEstdo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const props = defineProps<{
  datos: VehiculoEstado[];
  titulo?: string;
}>();

const colorMap: Record<string, { bg: string; border: string }> = {
  Disponible:    { bg: "rgba(34, 197, 94, 0.5)",  border: "rgb(34, 197, 94)" },
  Mantenimiento: { bg: "rgba(234, 179, 8, 0.5)",  border: "rgb(234, 179, 8)" },
  Descontinuado: { bg: "rgba(239, 68, 68, 0.5)",  border: "rgb(239, 68, 68)" },
};
const colorDefault = { bg: "rgba(99, 102, 241, 0.5)", border: "rgb(99, 102, 241)" };

const chartData = computed<ChartData<"bar">>(() => ({
  labels: props.datos.map((e) => e.estado),
  datasets: [
    {
      label: "Cantidad de vehículos",
      data: props.datos.map((e) => e.total),
      backgroundColor: props.datos.map((e) => (colorMap[e.estado] ?? colorDefault).bg),
      borderColor: props.datos.map((e) => (colorMap[e.estado] ?? colorDefault).border),
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
}));

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
    },
  },
};
</script>

<template>
  <div class="rounded-lg border bg-card p-4">
    <h2 v-if="titulo" class="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
      {{ titulo }}
    </h2>
    <div class="h-52">
      <Bar
        v-if="datos.length > 0"
        :data="chartData"
        :options="chartOptions"
      />
      <div v-else class="flex items-center justify-center h-full text-muted-foreground text-sm">
        Cargando gráfico...
      </div>
    </div>
  </div>
</template>