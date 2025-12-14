import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/services/api';

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
        const res = await api.post('https://monitoramento-maquinas-backend-corrigido.onrender.com/api/maquinas/cadastrar-maquinas', dados);
        this.maquinas.push(res.data);
        return {ok: true};
      }catch(error){
        console.error("Erro ao cadastrar máquina:", error);
        return {ok: false, error};
      }
    },
    async carregarMaquinas() {
      try{
        const res = await api.get('https://monitoramento-maquinas-backend-corrigido.onrender.com/api/maquinas/lista-maquinas');
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
        await api.delete(`https://monitoramento-maquinas-backend-corrigido.onrender.com/api/maquinas/${id}`);
        this.maquinas = this.maquinas.filter(m => m._id !== id);
        return {ok: true};
      }catch(error){
        console.error("Erro ao deletar máquina:", error);
        return {ok: false, error};
      } 
    },
    async editarMaquina(id, dadosEditados) {
      try{
        const res = await api.put(`https://monitoramento-maquinas-backend-corrigido.onrender.com/api/maquinas/${id}`, dadosEditados);
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

