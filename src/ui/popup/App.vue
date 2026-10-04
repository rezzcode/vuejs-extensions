<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

function openExtensionPage() {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    chrome.tabs.create({ url: chrome.runtime.getURL('extension_page.html') })
  } else {
    window.open('http://localhost:8080', '_blank')
  }
}

function openSidePanel() {
  if (typeof chrome !== 'undefined' && chrome.sidePanel?.open) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (tabId) {
        chrome.sidePanel.open({ tabId })
      }
    })
  } else {
    window.open('http://localhost:8081', '_blank')
  }
}
</script>

<template>
  <div class="popup-container">
    <header class="popup-header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
      <div>
        <h2 class="title">Extension Popup</h2>
      </div>
    </header>

    <main class="popup-body">
      <section class="card">
        <h3>Pinia Counter</h3>
        <div class="counter-row">
          <span
            >Count: <strong>{{ counter.count }}</strong></span
          >
          <button class="btn btn-sm btn-primary" @click="counter.increment">+1</button>
        </div>
      </section>

      <section class="card actions-card">
        <h3>Navigation</h3>
        <div class="button-group">
          <button class="btn btn-secondary" @click="openExtensionPage">
            🖥️ Full Extension Page
          </button>
          <button class="btn btn-secondary" @click="openSidePanel">📱 Extension Side Panel</button>
        </div>
      </section>
    </main>

    <footer class="popup-footer">
      <small>Vue 3 + Vite Web Extension Template</small>
    </footer>
  </div>
</template>

<style scoped>
.popup-container {
  width: 340px;
  box-sizing: border-box;
  padding: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
  margin: 0 auto;
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 0.85rem;
}

.title {
  font-size: 1.05rem;
  font-weight: 600;
  color: hsla(280, 80%, 55%, 1);
  margin: 0;
  color: var(--color-heading);
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.75rem;
}

.card h3 {
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.counter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.btn-sm {
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
}

.btn-primary {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
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

.popup-footer {
  margin-top: 0.85rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
