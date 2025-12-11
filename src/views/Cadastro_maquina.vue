<template>
    <Header/>
    <section>
        <Formulario_cadastro_maquina/>
    </section>
    <Footer/>
</template>
<script>
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    import Formulario_cadastro_maquina from '../components/Formulario_cadastro_maquina.vue';
    export default {
        components: { Header, Footer, Formulario_cadastro_maquina}
    }
</script>