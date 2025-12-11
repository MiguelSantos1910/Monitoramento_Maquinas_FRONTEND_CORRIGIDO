<template>
    <Header />
    <section class="bg-white max-w-4xl mx-auto my-10 p-8 rounded-2xl shadow-md">
        <h2 class="text-3xl font-bold text-center mb-6 text-blue-700">SMPM</h2>
        <p class="text-gray-700 text-justify leading-relaxed">O Sistema de Manutenção Preventiva de Máquinas (SMPM) é uma aplicação web
            SPA (Single Page Application) destinada a empresas industriais que precisam gerenciar
            e acompanhar a manutenção preventiva de suas máquinas. O sistema fornece controle visual, registro
            e monitoramento de todas as atividades de manutenção, permitindo que gestores e equipes técnicas identifiquem
            rapidamente prioridades, reduzem falhas mecânicas e otimizem recursos.
        </p>
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