<template>
  <div class="pie-container">
    <Pie
      v-if="safeData"
      :data="safeData"
      :options="options"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

// NÃO recriar o objeto sempre — manter referência estável
const safeData = computed(() => {
  return props.chartData ?? { labels: [], datasets: [] }
})

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<style>
.pie-container {
  height: 320px; /* Altura fixa = sem crescer */
  width: 100%;
  position: relative;
}
</style>