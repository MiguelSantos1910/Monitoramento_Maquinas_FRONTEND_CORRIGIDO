<template>
    <Header />
    <section>
        <h2 class="title">Sistema de Manutenção Preventiva de Máquinas - SMPM</h2>
        <div class="cards">
            <div class="card">
                <a href="/agendamento">Agendamento de Manutenções</a>
                <div class="emoji" aria-label="Calendário" role="img">📅</div>
            </div> 
            <div class="card">
                <a href="/ordem">Ordem de Serviço</a>
                <div class="emoji" aria-label="Ferramenta" role="img">🛠️</div>
            </div>
            <div class="card">
                <a href="/desempenho">Indicadores de Desempenho</a>
                <div class="emoji" aria-label="Gráfico" role="img">📊</div>
            </div>
            <div class="card">
                <a href="/maquinas-cadastradas">Relatório de Máquinas Cadastradas</a>
                <div class="emoji" aria-label="Engrenagem" role="img">⚙️</div>
            </div>
            <div class="card">
                <a href="/maquina">Cadastrar Máquina</a>
                <div class="emoji" aria-label="Máquina" role="img">🏭</div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
    components: { Header, Footer }
}
</script>

<style scoped>
.title {
    background: linear-gradient(to right, #2563eb, #1e40af);
    padding: 0.25rem 1rem;
    color: white;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 20px;
}

.cards {
    display: flex;
    justify-content: space-around;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 20px;
}

.card {
    background: linear-gradient(to right, #2563eb, #1e40af);
    padding: 1rem;
    border-radius: 8px;
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    transition: background 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.card:hover {
    background: linear-gradient(to right, #1e40af, #2563eb);
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.card a {
    color: #ddd;
    font-weight: 600;
    text-decoration: none;
    margin-bottom: 12px;
    text-align: center;
}

.card a:hover {
    text-decoration: underline;
    color: #fff;
}

.emoji {
    font-size: 48px;
    line-height: 1;
    user-select: none;
}
</style>