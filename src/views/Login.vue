<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 px-4">
    <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeIn">

      <!-- Logo ou título -->
      <div class="text-center mb-6">
        <h2 class="text-3xl font-extrabold text-white drop-shadow">Acesso ao Sistema</h2>
        <p class="text-blue-200 mt-1 text-sm">Entre com suas credenciais para continuar</p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="fazerLogin" class="space-y-5">

        <!-- E-mail -->
        <div>
          <label class="block font-medium text-blue-100 mb-1">E-mail</label>
          <input
            v-model="email"
            type="email"
            placeholder="seuemail@empresa.com"
            class="w-full p-3 bg-white/20 text-white placeholder-blue-200 border border-white/30 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Senha -->
        <div>
          <label class="block font-medium text-blue-100 mb-1">Senha</label>
          <input
            v-model="senha"
            type="password"
            placeholder="••••••••"
            class="w-full p-3 bg-white/20 text-white placeholder-blue-200 border border-white/30 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Botão Login -->
        <button
          type="submit"
          :disabled="loading"
          class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold
                 shadow-lg shadow-blue-900/40 transition transform hover:scale-[1.02] active:scale-[0.98]
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Aguarde...</span>
          <span v-else>Entrar</span>
        </button>

      </form>

      <!-- Criar conta -->
      <div class="text-center mt-4">
        <span
          @click="router.push('/registro')"
          class="text-blue-200 hover:text-white underline text-sm cursor-pointer transition"
        >
          Criar conta
        </span>
      </div>

      <!-- Erro -->
      <p v-if="erro" class="text-red-400 text-center mt-4 font-medium">{{ erro }}</p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const erro = ref('')
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

async function fazerLogin() {
  if (loading.value) return

  loading.value = true
  erro.value = ""

  const sucesso = await auth.login(email.value, senha.value)

  loading.value = false

  if (sucesso) {
    router.push('/')
  } else {
    erro.value = auth.error
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}
</style>
