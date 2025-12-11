
<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div
      class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg mx-auto transition-all duration-300 transform scale-100"
    >
      <!-- Título -->
      <h2 v-if="title" class="text-2xl font-semibold mb-4 text-center">
        {{ title }}
      </h2>

      <!-- Corpo dinâmico -->
      <div class="modal-body text-base leading-relaxed">
        <slot></slot>
      </div>

      <!-- Ações -->
      <div class="modal-actions flex justify-end gap-4 mt-8">
        <slot name="actions">
          <button
            class="px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg font-medium transition"
            @click="confirm"
          >
            Confirmar
          </button>
          <button
            class="px-4 py-2 bg-red-800 hover:bg-red-400 text-white rounded-lg font-medium transition"
            @click="close"
          >
            Cancelar
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReusableModal",
  props: {
    show: { type: Boolean, required: true },
    title: { type: String, default: "" },
  },
  emits: ["close", "confirm"],
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
      alert('Máquina cadastrada com sucesso!')
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
