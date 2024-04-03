// Called when the user clicks on the extension icon.
chrome.action.onClicked.addListener((tab) => {
  // No tabs or host permissions needed!
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['js/redidget.js']
  });
});
