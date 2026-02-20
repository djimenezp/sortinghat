<template>
  <div class="d-flex" :class="from === 'user' ? 'justify-content-end' : 'justify-content-start'">
    <div
      class="px-3 py-2 rounded-4"
      :class="from === 'user' ? 'bg-dark text-white' : 'bg-white border'"
      style="max-width: min(780px, 92%); white-space: pre-wrap;"
    >
      <div v-if="text" v-html="text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></div>
      <div v-if="kind === 'choices'" class="mt-2">
        <slot name="choices" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  from: { type: String, required: true }, // 'bot' | 'user'
  kind: { type: String, required: true }, // 'text' | 'choices'
  text: { type: String, default: '' },
})
</script>

