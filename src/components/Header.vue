<template>
  <header class="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">

      <h1 class="text-2xl font-bold mb-2 md:mb-0 text-center md:text-left">
        Sistema de Manutenção Preventiva de Máquinas
      </h1>

      <div v-if="store.logado" class="flex space-x-4 text-sm md:text-base">
        <router-link to="/" class="text-white hover:bg-blue-600 px-3 py-2 rounded transition">Início</router-link>
        <router-link to="/relatorio" class="text-white hover:bg-blue-600 px-3 py-2 rounded transition">Relatórios</router-link>
        <router-link to="/about" class="text-white hover:bg-blue-600 px-3 py-2 rounded transition">Sobre</router-link>
        <router-link to="/operacao" class="text-white hover:bg-blue-600 px-3 py-2 rounded transition">Operações</router-link>
      </div>
      
      <div class="flex items-center space-x-4">

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
          @click="handleAuthClick"
        >
          {{ store.logado ? 'Logout' : 'Login' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router'; 

const store = useAuthStore();
const router = useRouter(); 

async function handleAuthClick() {
  if (store.logado) {
    store.logout();
    alert('Usuário desconectado com sucesso!')
    router.push('/');
  } else {
    router.push('/login');
  }
}
</script>