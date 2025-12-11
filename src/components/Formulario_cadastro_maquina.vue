<template>
  <div class="max-w-3xl mx-auto mt-10 space-y-10">
    <!-- Cadastro de Máquinas -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-10 px-6 rounded-lg shadow-lg text-white">
      <h2 class="text-2xl font-bold mb-6 text-center">Cadastro de Máquinas</h2>

      <form @submit.prevent="cadastrarMaquina" class="space-y-4">
        <!-- Nome Máquina -->
        <div>
          <label class="block text-sm font-medium mb-1">Nome Máquina:</label>
          <input
            v-model="form.nome"
            type="text"
            placeholder="Ex: Extrusora 01"
            class="w-full p-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Modelo -->
        <div>
          <label class="block text-sm font-medium mb-1">Modelo:</label>
          <input
            v-model="form.modelo"
            type="text"
            placeholder="Ex: M6780"
            class="w-full p-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Nº Série -->
        <div>
          <label class="block text-sm font-medium mb-1">Nº Série:</label>
          <input
            v-model="form.serie"
            type="text"
            placeholder="Ex: 12345"
            class="w-full p-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <!-- Setor -->
        <div>
          <label class="block text-sm font-medium mb-1">Setor:</label>
          <select
            v-model="form.setor"
            class="w-full p-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Selecione</option>
            <option>Produção</option>
            <option>Manutenção</option>
            <option>Logística</option>
            <option>Administração</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium mb-1">Status:</label>
          <select
            v-model="form.status"
            class="w-full p-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="Ativa">Ativa</option>
            <option value="Em manutenção">Em manutenção</option>
            <option value="Inativa">Inativa</option>
          </select>
        </div>

        <!-- Botão Cadastrar -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-2 px-4 rounded-lg font-semibold shadow-md transition-all"
        >
          Cadastrar
        </button>
      </form>
    </div>

      <!--Modal-->
     <ReusableModal
      v-if="mostrarModal"
      :show="mostrarModal"
      :title="'Confirmação'"
      @close="mostrarModal = false"
      @confirm="confirmarCadastro"
      >
      <p class="text-center text-white text-lg font-medium">
        {{ mensagemModal }}
      </p>
      </ReusableModal>
           
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useMaquinasStore } from '../stores/cadastro_maquina.js'
const mostrarModal = ref(false)
const mensagemModal = ref('')

import ReusableModal from '../components/Modal.vue'

const store = useMaquinasStore()

const form = reactive({
  nome: '',
  modelo: '',
  serie: '',
  setor: '',
  status: 'Ativa'
})

function resetForm() {
  form.nome = ''
  form.modelo = ''
  form.serie = ''
  form.setor = ''
  form.status = 'Ativa'
}

function cadastrarMaquina() {
  mensagemModal.value = 'Deseja confirmar o cadastro da máquina?'
  mostrarModal.value = true
}

async function confirmarCadastro() {
  const confirmacao = await store.cadastrarMaquina({ ...form })
  if(confirmacao.ok){
    resetForm()
    mostrarModal.value = false
  }else{
    alert('Erro ao cadastrar a máquina.')
  }
}

</script>
