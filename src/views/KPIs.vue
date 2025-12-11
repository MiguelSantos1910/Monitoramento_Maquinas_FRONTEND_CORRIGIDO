<template>
    <Header/>
    <KPI/>
    <Footer/>
</template>
<script>
import Header from '../components/Header.vue';
import KPI from '../components/KPI.vue';
import Footer from '../components/Footer.vue';
export default {
  components:{ Header, KPI, Footer }
}
</script>