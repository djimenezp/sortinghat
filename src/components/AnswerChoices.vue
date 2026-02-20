<template>
  <div class="d-grid gap-2">
    <button
      v-for="c in choices"
      :key="c.key"
      class="btn btn-outline-secondary text-start"
      :disabled="disabled"
      @click="pick(c)"
    >
      {{ c.title }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  choices: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['pick'])

function pick(c) {
  if (props.disabled) return
  emit('pick', c)
}
</script>
