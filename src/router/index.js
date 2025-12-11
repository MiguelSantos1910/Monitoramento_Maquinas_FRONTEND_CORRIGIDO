import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Operacao from '../views/Operacao.vue'
import Agendamento from '../views/Agendamento.vue'
import Oredem_servico from '../views/Oredem_servico.vue'
import Formulario_cadastro from '../views/Cadastro_maquina.vue'
import Relatorio from '../views/Relatorio.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import MaquinasCadastradas from '../views/Relatorio_maquinas_cadastradas.vue'
import KPI from '../views/KPIs.vue'
const routes = [
    { path: '/', component: Home},
    { path: '/about', component: About},
    { path: '/operacao', component: Operacao},
    { path: '/agendamento', component: Agendamento},
    { path: '/ordem', component: Oredem_servico},
    { path: '/maquina', component: Formulario_cadastro},
    { path: '/relatorio', component: Relatorio},
    { path: '/login', component: Login }, 
    { path: '/registro', component: Registro },
    { path: '/maquinas-cadastradas', component: MaquinasCadastradas },
    { path: '/desempenho', component: KPI }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router