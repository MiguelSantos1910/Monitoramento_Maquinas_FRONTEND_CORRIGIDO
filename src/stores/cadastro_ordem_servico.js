import { defineStore } from 'pinia';
import axios from 'axios';

export const useCadastroManutencao = defineStore('manutencao', {
  state: () => ({
    manutencao: [], // Lista de manutenção
    termoBusca: "" // Barra de pesquisa vazia
  }),
  getters: {
    manutencaoFiltradas: (state) => {
      if (!state.termoBusca) {
        return state.manutencao;
      }
      return state.manutencao.filter(man =>
        man.nome.toLowerCase().includes(state.termoBusca.toLowerCase())
      );
    },
    // useCadastroManutencao.js (Getter Corrigido)

  atributosCalendario: (state) => {
      return state.manutencao.map(m => {
          const chave = m._id || m.id; 

          const dataManutencao = new Date(m.data);

          if (isNaN(dataManutencao)) {
              console.warn(`Data inválida encontrada para a manutenção ${chave}: ${m.data}`);
              return null; 
          }

          return {
              key: chave, 
              dates: dataManutencao, // Data válida
              highlight: {
                  color: m.status === "Em manutenção" ? 'orange' : 'green',
                  fillmode: 'solid'
              },
              popover: { label: m.nome }
          };
      }).filter(attr => attr !== null); // Remove atributos nulos/inválidos
  }
  },
  actions: {
    async cadastrarManutencao(dadosManutencao) {
      try{
        const res = await axios.post('http://localhost:3000/api/ordens/cadastrar-os', dadosManutencao);
         this.manutencao.push(res.data);
         return {ok: true};
      }catch(error){
        console.error("Erro ao cadastrar manutenção:", error);
        return {ok: false, error};
      }
    },
    async carregarManutencao() {
      try{
        const res = await axios.get('http://localhost:3000/api/ordens/consultar-os');
        this.manutencao = res.data;
      }catch(error){
        console.error("Erro ao carregar manutenções:", error);
      }
    },
    setTermoBusca(termo) {
      this.termoBusca = termo;
    },
    async deletarManutencao() {
      try{
        await axios.delete(`http://localhost:3000/api/ordens/${id}`);
        this.manutencao = this.manutencao.filter(m => m.id !== id);
        return {ok: true};
      }catch(error){
        console.error("Erro ao deletar manutenção:", error);
        return {ok: false, error};
      }
    },
    async atualizarManutencao(id, dadosAtualizados) {
      try{
        const res = await axios.put(`http://localhost:3000/api/ordens/${id}`, dadosAtualizados);
        const index = this.manutencao.findIndex(m => m._id === id);
        if (index !== -1) {
          this.manutencao[index] = res.data;
        }
        return {ok: true};
      }catch(error){
        console.error("Erro ao atualizar manutenção:", error);
        return {ok: false, error};
      }
    }
  }
});