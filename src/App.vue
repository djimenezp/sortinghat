<template>
  <div class="min-vh-100 bg-body-tertiary d-flex flex-column">
    <header class="border-bottom bg-white">
      <div class="container py-3 d-flex align-items-center justify-content-between">
        <div>
          <div class="fw-semibold">Sorting Hat</div>
          <div class="text-secondary small">A chat-style Hogwarts house quiz</div>
        </div>
        <span class="badge text-bg-dark">Vue + Bootstrap</span>
      </div>
    </header>

    <main class="container flex-grow-1 py-3">
      <ChatSortingHat />
    </main>

    <footer class="container pb-4 text-secondary small">
      Built as a chat quiz with animations and smooth scrolling.
    </footer>
  </div>
</template>

<script setup>
import ChatSortingHat from './components/ChatSortingHat.vue'
</script>
