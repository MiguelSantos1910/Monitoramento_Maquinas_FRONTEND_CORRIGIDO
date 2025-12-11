<template>
  <div class="space-y-10 mt-10">
    <!-- KPIs -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(kpi, index) in kpis"
        :key="index"
        class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105"
      >
        <h3 class="text-lg font-semibold mb-2">{{ kpi.titulo }}</h3>
        <p class="text-3xl font-bold">{{ kpi.valor }}</p>
      </div>
    </div>

    <!-- Gráfico de Pizza -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-xl font-bold text-center text-blue-700 mb-4">
        Distribuição de Status
      </h3>
      <PizzaChart v-if="store.maquinas.length" :chart-data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useMaquinasStore } from '../stores/cadastro_maquina.js'
import PizzaChart from './Pizza.vue'

const store = useMaquinasStore()

onMounted(async () => {
  if (store.carregarMaquinas) {
    await store.carregarMaquinas() 
  }
})

// KPIs
const kpis = computed(() => {
  const total = store.maquinas.length
  const ativas = store.maquinas.filter(m => m.status === 'Ativa').length
  const manutencao = store.maquinas.filter(m => m.status === 'Em manutenção').length
  const inativas = store.maquinas.filter(m => m.status === 'Inativa').length

  return [
    { titulo: 'Ativas', valor: ativas },
    { titulo: 'Em Manutenção', valor: manutencao },
    { titulo: 'Inativas', valor: inativas },
    { titulo: 'Total', valor: total }
  ]
})

// Chart data
const chartData = computed(() => {
  const counts = { 'Ativa': 0, 'Em manutenção': 0, 'Inativa': 0 }
  store.maquinas.forEach(m => {
    if (counts[m.status] !== undefined) counts[m.status]++
  })

  return {
    labels: ['Ativas', 'Em manutenção', 'Inativas'],
    datasets: [
      {
        label: 'Máquinas',
        data: [counts['Ativa'], counts['Em manutenção'], counts['Inativa']],
        backgroundColor: ['#34D399', '#FBBF24', '#EF4444']
      }
    ]
  }
})
</script>
