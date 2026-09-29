// Content script template for Vue.js Web Extension
console.log('[Content Script] Injected into:', window.location.href)

// Listen for messages from popup, sidePanel, or background
if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === 'GET_PAGE_INFO') {
      sendResponse({
        url: window.location.href,
        title: document.title,
      })
    }
    return true
  })
}

export {}
