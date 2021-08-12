chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('http')) {
    chrome.tabs.executeScript(tabId, { file: './inject.js' }, () => {
      chrome.tabs.executeScript(tabId, { file: './content-script.bundle.js' }, () => {
        console.log('im i a meme')
      })
    })
  }
})
