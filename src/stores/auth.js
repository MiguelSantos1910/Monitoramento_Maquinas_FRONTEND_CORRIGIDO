import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: (() => {
      try {
        const u = localStorage.getItem('user')
        return u ? JSON.parse(u) : null
      } catch (e) {
        return null
      }
    })(),
    token: localStorage.getItem('token') || null,
    error: null
  }),

  actions: {
    async login(email, senha) {
      try {
        const { data } = await axios.post('http://localhost:3000/api/usuarios/login', {
          email,
          senha
        })

        this.user = data.usuario
        this.token = "fake-token"

        localStorage.setItem("user", JSON.stringify(data.usuario))
        localStorage.setItem("token", this.token)

        return true
      } catch (err) {
        this.error = err.response?.data?.mensagem || 'Falha no login'
        return false
      }
    },

    async register(nome, email, senha){
      try{
        const { data } = await axios.post('http://localhost:3000/api/usuarios/cadastrar-usuario', {
          nome,
          email,
          senha
        })
        this.user = data.usuario
        this.token = "fake-token"

        localStorage.setItem("user", JSON.stringify(data.usuario))
        localStorage.setItem("token", this.token)

        return true
      }catch(err){
        this.error = err.response?.data?.mensagem || "Falha no registro"
        return false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

     async usuariosCadastrados(){
      try{
        const {data} = axios.get('http://localhost:3000/api/usuarios/lista-usuarios', {nome})
        this.user = data.usuario
      }catch(error){
        console.error('Erro ao carregar os usuarios', error)
      }
    }
  },

  getters: {
    logado: (state) => !!state.token,
    usuario: (state) => state.usuario?.nome || ''
  }
})
