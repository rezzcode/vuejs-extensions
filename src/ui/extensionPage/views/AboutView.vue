<template>
  <div class="about">
    <h1>About This Web Extension</h1>
    <p>
      This extension is built with Vue 3, Vite, and TypeScript. It demonstrates how to create a
      multi-surface browser extension supporting:
    </p>
    <ul>
      <li>
        <strong>Extension Page (Full Tab):</strong> Dedicated options or full-tab application page.
      </li>
      <li><strong>Side Panel:</strong> Embedded sidebar panel in Chrome and Firefox.</li>
      <li><strong>Popup:</strong> Quick toolbar action popup menu.</li>
      <li><strong>Background Service Worker:</strong> Lifecycle management and message passing.</li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  padding: 1.5rem;
  max-width: 650px;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

ul {
  padding-left: 1.5rem;
  line-height: 1.8;
}
</style>
