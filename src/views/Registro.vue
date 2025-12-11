<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 px-4">
    <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeIn">

      <!-- Título -->
      <div class="text-center mb-6">
        <h2 class="text-3xl font-extrabold text-white drop-shadow">Criar Conta</h2>
        <p class="text-blue-200 mt-1 text-sm">Preencha os dados para registrar um novo usuário</p>
      </div>

      <form @submit.prevent="registrar" class="space-y-5">

        <!-- Nome -->
        <div>
          <label class="block font-medium text-blue-100 mb-1">Nome</label>
          <input
            v-model="nome"
            type="text"
            placeholder="Seu nome completo"
            class="w-full p-3 bg-white/20 text-white placeholder-blue-200 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- E-mail -->
        <div>
          <label class="block font-medium text-blue-100 mb-1">E-mail</label>
          <input
            v-model="email"
            type="email"
            placeholder="seuemail@empresa.com"
            class="w-full p-3 bg-white/20 text-white placeholder-blue-200 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            class="w-full p-3 bg-white/20 text-white placeholder-blue-200 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Confirmar Senha -->
        <div>
          <label class="block font-medium text-blue-100 mb-1">Confirmar Senha</label>
          <input
            v-model="confirmarSenha"
            type="password"
            placeholder="Repita a senha"
            class="w-full p-3 bg-white/20 text-white placeholder-blue-200 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Botão Registrar -->
        <button
          type="submit"
          :disabled="loading"
          class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold
                 shadow-lg shadow-blue-900/40 transition transform hover:scale-[1.02] active:scale-[0.98]
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        <span v-if="loading">Aguarde...</span>
        <span v-else>Registrar</span>
      </button>
      </form>

      <!-- Voltar para Login -->
      <div class="text-center mt-4">
        <span
          @click="router.push('/login')"
          class="text-blue-200 hover:text-white underline text-sm cursor-pointer transition"
        >
          Já tem conta? Fazer login
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

const nome = ref('')
const email = ref('')
const senha = ref('')
const loading = ref(false)
const confirmarSenha = ref('')
const erro = ref('')

const router = useRouter()
const auth = useAuthStore()

async function registrar() {
  if (loading.value) return

  erro.value = ""

  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não correspondem.'
    return 
  }

  loading.value = true
  
  try {
    const sucesso = await auth.register(nome.value, email.value, senha.value)

    if (sucesso) {
      alert('Usuário cadastrado com sucesso!')
      router.push('/login')
    } else {
      erro.value = auth.error || 'Erro desconhecido ao registrar.'
    }
  } catch (error) {
    erro.value = 'Ocorreu um erro inesperado. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}
</style>
