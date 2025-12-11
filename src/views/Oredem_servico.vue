<template>
    <Header/>
    <section>
        <Formulario_os/>
    </section>
    <Footer/>
</template>
<script>
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    import Formulario_os from '../components/Formulario_os.vue'
    export default {
        components: { Header, Footer, Formulario_os }
    }
</script>
