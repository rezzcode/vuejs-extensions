<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const statusMessage = ref('Yay! Side panel is initialized and ready.')

function openExtensionPage() {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    chrome.tabs.create({ url: chrome.runtime.getURL('extension_page.html') })
  } else {
    window.open('http://localhost:8080', '_blank')
  }
}

function pingBackground() {
  statusMessage.value = 'Sending message to background...'
  if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
    chrome.runtime.sendMessage({ type: 'PING', source: 'sidePanel' }, (response) => {
      if (chrome.runtime.lastError) {
        statusMessage.value = `Response error: ${chrome.runtime.lastError.message}`
      } else {
        statusMessage.value = `Received from background: ${JSON.stringify(response)}`
      }
    })
  } else {
    setTimeout(() => {
      statusMessage.value =
        'Simulated background response: { pong: true, time: ' +
        new Date().toLocaleTimeString() +
        ' }'
    }, 400)
  }
}
</script>

<template>
  <div class="sidepanel-container">
    <header class="sidepanel-header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="36" height="36" />
      <div>
        <h2 class="title">Extension Side Panel</h2>
      </div>
    </header>

    <main class="sidepanel-body">
      <section class="card">
        <h3>Shared Pinia Store</h3>
        <p class="counter-display">
          Current count: <strong>{{ counter.count }}</strong>
        </p>
        <p class="counter-display">
          Double count: <strong>{{ counter.doubleCount }}</strong>
        </p>
        <button class="btn btn-primary" @click="counter.increment">Increment Counter</button>
      </section>

      <section class="card">
        <h3>Extension Actions</h3>
        <div class="button-group">
          <button class="btn btn-secondary" @click="openExtensionPage">
            Open Full Extension Page
          </button>
          <button class="btn btn-secondary" @click="pingBackground">Ping Background Worker</button>
        </div>
        <div class="status-box">
          <small>{{ statusMessage }}</small>
        </div>
      </section>

      <section class="card info-card">
        <h3>Dev Mode Info</h3>
        <p>In dev mode, this side panel runs on its own port with hot module reload (HMR).</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.sidepanel-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
  max-width: 500px;
  margin: 0 auto;
}

.sidepanel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: hsla(210, 100%, 45%, 1);
  margin: 0;
  color: var(--color-heading);
}

.sidepanel-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.85rem;
}

.card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.counter-display {
  font-size: 0.88rem;
  margin: 0.25rem 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  border-color: hsla(160, 100%, 37%, 1);
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background-color: hsla(160, 100%, 30%, 1);
}

.btn-secondary {
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-border);
}

.status-box {
  margin-top: 0.6rem;
  padding: 0.4rem 0.6rem;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  border: 1px solid var(--color-border);
  font-family: monospace;
  font-size: 0.78rem;
  word-break: break-all;
}

.info-card p {
  font-size: 0.82rem;
  color: var(--color-text);
  opacity: 0.85;
  margin: 0;
}
</style>
