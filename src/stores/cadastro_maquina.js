import { defineStore } from 'pinia';
import axios from 'axios';

export const useMaquinasStore = defineStore('maquinas', {
  state: () => ({
    maquinas: [], // Lista de máquinas
    termoBusca: "" // Barra de pesquisa vazia
  }),
  getters: {
    maquinasFiltradas: (state) => {
      if (!state.termoBusca) {
        return state.maquinas;
      }
      return state.maquinas.filter(m => 
        m.nome.toLowerCase().includes(state.termoBusca.toLowerCase())
      );
    }
  },
  actions: {
    async cadastrarMaquina(dados) {
      try{
        const res = await axios.post('http://localhost:3000/api/maquinas/cadastrar-maquinas', dados);
        this.maquinas.push(res.data);
        return {ok: true};
      }catch(error){
        console.error("Erro ao cadastrar máquina:", error);
        return {ok: false, error};
      }
    },
    async carregarMaquinas() {
      try{
        const res = await axios.get('http://localhost:3000/api/maquinas/lista-maquinas');
        this.maquinas = res.data;
      }catch(error){
        console.error("Erro ao carregar máquinas:", error);
      } 
    }, 
    setTermoBusca(termo) {
      this.termoBusca = termo;
    },
    async deletarMaquina(id) {
      try{
        await axios.delete(`http://localhost:3000/api/maquinas/${id}`);
        this.maquinas = this.maquinas.filter(m => m._id !== id);
        return {ok: true};
      }catch(error){
        console.error("Erro ao deletar máquina:", error);
        return {ok: false, error};
      } 
    },
    async editarMaquina(id, dadosEditados) {
      try{
        const res = await axios.put(`http://localhost:3000/api/maquinas/${id}`, dadosEditados);
        const index = this.maquinas.findIndex(m => m._id === id);
        if (index !== -1) {
          this.maquinas[index] = res.data;
        }
        return {ok: true};
      }catch(error){
        console.error("Erro ao editar máquina:", error);
        return {ok: false, error};
      } 
    }
  }
});