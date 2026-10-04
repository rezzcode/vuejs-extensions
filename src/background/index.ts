import browser from 'webextension-polyfill'

console.log('[Background] Service worker / background script initialized')

// Handle extension installation or update
browser.runtime.onInstalled.addListener((details) => {
  console.log('[Background] Extension installed/updated:', details.reason)
})

// Listen for messages from extension pages (extensionPage, sidePanel, popup, or content script)
browser.runtime.onMessage.addListener(
  async (message: any, sender: browser.Runtime.MessageSender) => {
    console.log('[Background] Received message:', message, 'from:', sender)

    if (!message || typeof message !== 'object') {
      return { success: false, error: 'Invalid message payload' }
    }

    switch (message.type) {
      case 'PING':
        return {
          pong: true,
          timestamp: Date.now(),
          source: message.source || 'unknown',
        }

      case 'OPEN_EXTENSION_PAGE': {
        try {
          const url = browser.runtime.getURL('extension_page.html')
          const tab = await browser.tabs.create({ url })
          return { success: true, tabId: tab.id }
        } catch (err) {
          const error = err instanceof Error ? err.message : String(err)
          return { success: false, error }
        }
      }

      case 'OPEN_SIDE_PANEL': {
        try {
          // Chromium sidePanel API support
          if (typeof chrome !== 'undefined' && chrome.sidePanel?.open && sender.tab?.id) {
            await chrome.sidePanel.open({ tabId: sender.tab.id })
            return { success: true }
          }
          return { success: false, error: 'Side panel API not supported in this context' }
        } catch (err) {
          const error = err instanceof Error ? err.message : String(err)
          return { success: false, error }
        }
      }

      default:
        return { success: false, error: `Unknown message type: ${message.type}` }
    }
  },
)
