<template>
  <Header/>

  <div class="bg-white py-6 px-6 m-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">
      Relatório de Máquinas
    </h2>

    <!-- Barra de busca -->
    <div class="mb-4">
      <input
        v-model="store.termoBusca"
        type="text"
        placeholder="Buscar por nome..."
        class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <!-- Tabela -->
    <div v-if="maquinasFiltradas.length" class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 rounded">
        <thead class="bg-gray-200">
          <tr class="text-black text-center">
            <th class="border px-3 py-2">Nome Máquina</th>
            <th class="border px-3 py-2">Modelo</th>
            <th class="border px-3 py-2">Nº Série</th>
            <th class="border px-3 py-2">Setor</th>
            <th class="border px-3 py-2">Status</th>
            <th class="border px-3 py-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(m, i) in maquinasFiltradas"
            :key="i"
            class="text-blue-500 text-center"
          >
            <!-- Nome -->
            <td class="border px-3 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.nome" class="border p-1 w-full rounded" />
              </template>
              <template v-else>
                {{ m.nome }}
              </template>
            </td>

            <!-- Modelo -->
            <td class="border px-3 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.modelo" class="border p-1 w-full rounded" />
              </template>
              <template v-else>
                {{ m.modelo }}
              </template>
            </td>

            <!-- Série -->
            <td class="border px-3 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.serie" class="border p-1 w-full rounded" />
              </template>
              <template v-else>
                {{ m.serie }}
              </template>
            </td>

            <!-- Setor -->
            <td class="border px-3 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.setor" class="border p-1 w-full rounded" />
              </template>
              <template v-else>
                {{ m.setor }}
              </template>
            </td>

            <!-- Status -->
            <td class="border px-3 py-2">
              <template v-if="editando === m._id">
                <select v-model="draft.status" class="border p-1 rounded w-full">
                  <option>Ativa</option>
                  <option>Em manutenção</option>
                  <option>Inativa</option>
                </select>
              </template>
              <template v-else>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-white font-semibold',
                    m.status === 'Ativa' && 'bg-green-500',
                    m.status === 'Em manutenção' && 'bg-orange-500',
                    m.status === 'Inativa' && 'bg-gray-500'
                  ]"
                >
                  {{ m.status }}
                </span>
              </template>
            </td>

            <!-- Ações -->
            <td class="border px-3 py-4 space-x-2">
              <template v-if="editando === m._id">
                <button
                  @click="salvar(m._id)"
                  class="px-2 py-1 m-2 bg-green-600 text-white rounded"
                >
                  Salvar
                </button>

                <button
                  @click="cancelar"
                  class="px-2 py-1 bg-gray-500 text-white rounded"
                >
                  Cancelar
                </button>
              </template>

              <template v-else>
                <button
                  @click="iniciarEdicao(m)"
                  class="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  Editar
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-center text-gray-500 mt-4">
      Nenhuma máquina cadastrada
    </p>
  </div>

  <Footer/>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMaquinasStore } from '../stores/cadastro_maquina'

const store = useMaquinasStore()
const { maquinasFiltradas } = storeToRefs(store)

onMounted(() =>{
  store.carregarMaquinas();
})

const editando = ref(null)
const draft = reactive({})

function iniciarEdicao(m) {
  editando.value = m._id
  Object.assign(draft, JSON.parse(JSON.stringify(m)))
}

async function salvar(id) {
  await store.editarMaquina(id, draft)
  editando.value = null
}

function cancelar() {
  editando.value = null
}
</script>
