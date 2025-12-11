<template>
  <footer class="bg-gradient-to-r from-blue-900 to-blue-700 text-white mt-12">
    <div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      
      <!-- Seção 1: Sobre -->
      <div>
        <h2 class="font-bold text-lg mb-2">Sobre o Sistema</h2>
        <p class="text-white/80">
          O Sistema de Manutenção Preventiva de Máquinas (SMPM) foi desenvolvido para otimizar a gestão de ativos industriais, aumentar a eficiência operacional e reduzir falhas inesperadas.
        </p>
      </div>

      <!-- Seção 2: Navegação -->
      <div>
        <h2 class="font-bold text-lg mb-2">Navegação</h2>
        <ul class="space-y-1">
          <li><a href="/" class="hover:underline">Início</a></li>
          <li><a href="/relatorios" class="hover:underline">Relatórios</a></li>
          <li><a href="/operacao" class="hover:underline">Operações</a></li>
          <li><a href="/about" class="hover:underline">Sobre</a></li>
        </ul>
      </div>

      <!-- Seção 3: Contato -->
      <div>
        <h2 class="font-bold text-lg mb-2">Contato</h2>
        <ul class="space-y-1">
          <li>Email: <a href="mailto:suporte@smpsistema.com" class="hover:underline">suporte@smpsistema.com</a></li>
          <li>Telefone: (11) 1234-5678</li>
          <li>Endereço: Av. da Indústria, 123 - São Paulo, SP</li>
        </ul>
      </div>

    </div>

    <!-- Base do footer -->
    <div class="bg-blue-950 text-white/70 text-center text-xs py-4 border-t border-white/10">
      <p>&copy; 2025 SMPM. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
