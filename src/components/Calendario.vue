<template>
  <Header />
  <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-10 mt-10 rounded-lg max-w-lg mx-auto">
    <h2 class="text-xl text-center font-bold mb-6 text-white">Calendário</h2>
    <Calendar v-model="date" :attributes="atributosCalendario" expanded class="custom-calendar" />
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import { storeToRefs } from 'pinia'
import { useCadastroManutencao } from '../stores/cadastro_ordem_servico'

export default {
  name: 'Calendario',
  components: {
    Header,
    Footer,
    Calendar
  },

  setup() {
    const store = useCadastroManutencao()
    const { atributosCalendario } = storeToRefs(store)

    //Carrega as manutenções ao entrar na página
    store.carregarManutencao()

    return {
      atributosCalendario
    }
  },

  data() {
    return {
      date: new Date()
    }
  }
}
</script>
<style scoped>
.custom-calendar {
  /* Cores e variáveis do V-Calendar */
  --vc-day-bg: transparent;
  --vc-day-color: #1e293b;
  --vc-today-border-color: #3b82f6;
  --vc-selected-bg: #2563eb;
  --vc-nav-button-color: white;
  --vc-weekday-color: #bfdbfe;
  --vc-header-bg: transparent;
  --vc-weekday-bg: transparent;
  --vc-nav-title-bg: transparent;
  --vc-nav-title-color: #1e293b;
  font-weight: 600;

  /* Aparência geral (bordas, sombra, centralização) */
  max-width: 420px;
  margin: 2rem auto;
  background: white;
  border-radius: 1rem; /* bordas arredondadas */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* sombra suave */
  overflow: hidden;
}

/* Cabeçalho do calendário */
.custom-calendar .vc-header {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: white !important;
  padding: 0.75rem 1rem;
  border-radius: 1rem 1rem 0 0;
}

/* Botões de navegação (setas) */
.custom-calendar .vc-nav-prev,
.custom-calendar .vc-nav-next {
  background: rgba(255, 255, 255, 0.15) !important;
  border-radius: 50%;
  padding: 0.3rem;
  transition: background 0.2s ease;
}
.custom-calendar .vc-nav-prev:hover,
.custom-calendar .vc-nav-next:hover {
  background: rgba(255, 255, 255, 0.3) !important;
}

/* Título do mês */
.custom-calendar .vc-nav-title {
  background: transparent !important;
  color: white !important;
  font-weight: 700;
  font-size: 1.1rem;
}
.custom-calendar .vc-nav-title:focus {
  outline: none !important;
  background: transparent !important;
}

/* Dias e interação */
.custom-calendar .vc-day:hover {
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

/* Dia selecionado */
.custom-calendar .vc-day.is-selected {
  background-color: #2563eb !important;
  color: white !important;
}

/* Dias desabilitados */
.custom-calendar .vc-day--disabled {
  color: #9ca3af;
}

/* Linha dos dias da semana */
.custom-calendar .vc-weekdays {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
</style>
