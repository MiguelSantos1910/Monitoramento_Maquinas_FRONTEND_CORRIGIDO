<template>
  <Header />

  <div class="bg-white py-6 px-6 m-6 rounded-lg shadow-lg">
    <!-- Título -->
    <div class="text-2xl font-bold mb-6 text-center text-blue-700">
      <h2 class="text-2xl font-bold text-center text-blue-700">
        Relatório de Ordens
      </h2>
    </div>

    <!-- Barra de busca -->
    <div class="mb-5">
      <input
        v-model="store.termoBusca"
        type="text"
        placeholder="Buscar por nome da máquina..."
        class="w-full p-3 rounded-lg border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Tabela -->
    <div 
      v-if="store.manutencaoFiltradas.length"
      class="overflow-x-auto shadow rounded-lg"
    >
      <table class="min-w-full border border-gray-300 rounded">
        <thead class="bg-gray-100 sticky top-0 z-10">
          <tr class="text-gray-700">
            <th class="border px-4 py-2">Nome Máquina</th>
            <th class="border px-4 py-2">Modelo</th>
            <th class="border px-4 py-2">Nº Série</th>
            <th class="border px-4 py-2">Setor</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Descrição</th>
            <th class="border px-4 py-2">Data</th>
            <th class="border px-4 py-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(m, i) in store.manutencaoFiltradas"
            :key="i"
            class="text-center text-blue-600 text-sm hover:bg-gray-50"
          >
            <!-- Nome -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.nome" class="border p-1 w-full" />
              </template>
              <template v-else>
                {{ m.nome }}
              </template>
            </td>

            <!-- Modelo -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.modelo" class="border p-1 w-full" />
              </template>
              <template v-else>
                {{ m.modelo }}
              </template>
            </td>

            <!-- Número de Série -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.serie" class="border p-1 w-full" />
              </template>
              <template v-else>
                {{ m.serie }}
              </template>
            </td>

            <!-- Setor -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <input v-model="draft.setor" class="border p-1 w-full" />
              </template>
              <template v-else>
                {{ m.setor }}
              </template>
            </td>

            <!-- Status -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <select v-model="draft.status" class="border p-1">
                  <option>Ativa</option>
                  <option>Em manutenção</option>
                  <option>Inativa</option>
                </select>
              </template>
              <template v-else>
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-white font-semibold',
                    m.status === 'Ativa' && 'bg-green-500',
                    m.status === 'Em manutenção' && 'bg-orange-500',
                    m.status === 'Inativa' && 'bg-gray-500'
                  ]"
                >
                  {{ m.status }}
                </span>
              </template>
            </td>

            <!-- Descrição -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <textarea v-model="draft.descricao" class="border p-1 w-full"></textarea>
              </template>
              <template v-else>
                {{ m.descricao }}
              </template>
            </td>

            <!-- Data -->
            <td class="border px-4 py-2">
              <template v-if="editando === m._id">
                <input type="date" v-model="draft.data" class="border p-1" />
              </template>
              <template v-else>
                {{ m.data }}
              </template>
            </td>

            <!-- Botões -->
            <td class="border px-4 py-2 space-x-2">
              <template v-if="editando === m._id">
                <button
                  @click="salvar(m._id)"
                  class="px-3 py-1 m-2 bg-green-600 text-white rounded"
                >
                  Salvar
                </button>

                <button
                  @click="cancelar"
                  class="px-3 py-1 bg-gray-500 text-white rounded text-xs"
                >
                  Cancelar
                </button>
              </template>

              <template v-else>
                <button
                  @click="iniciarEdicao(m)"
                  class="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs"
                >
                  Editar
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-600 mt-6">
      Nenhuma ordem de serviço encontrada.
    </div>
  </div>

  <Footer />
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { onMounted, reactive, ref } from "vue";
import { useCadastroManutencao } from "../stores/cadastro_ordem_servico";

const store = useCadastroManutencao();

onMounted(() =>{
  store.carregarManutencao();
})

const editando = ref(null); // guarda o ID da linha em edição
const draft = reactive({}); // cópia temporária para edição

function iniciarEdicao(m) {
  editando.value = m._id;
  Object.assign(draft, JSON.parse(JSON.stringify(m))); // cópia limpa
}

async function salvar(id) {
  await store.atualizarManutencao(id, draft);
  editando.value = null;
}

function cancelar() {
  editando.value = null;
}
</script>