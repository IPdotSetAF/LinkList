chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extract-selection",
    title: "Extract Links from Selection",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "extract-page",
    title: "Extract All Links from Page",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["notification.js"]
  });

  switch (info.menuItemId) {
    case "extract-selection": {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractFromSelection
      });
      break;
    }
    case "extract-page": {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractFromPage
      });
      break;
    }
  }
});

function extractFromSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) {
    showNotification("No text selected.");
    return;
  }

  const range = selection.getRangeAt(0);
  const tempDiv = document.createElement("div");
  tempDiv.appendChild(range.cloneContents());

  const links = tempDiv.querySelectorAll("a");

  if (links.length === 0) {
    showNotification("No links found in selection.");
    return;
  }

  const urls = Array.from(links).map(a => a.href);
  const textToCopy = urls.join("\n");

  navigator.clipboard.writeText(textToCopy).then(() => {
    showNotification(`${urls.length} link(s) copied to clipboard!`);
  }).catch(err => {
    console.error("Failed to copy: ", err);
    showNotification("Failed to copy links.");
  });
}

function extractFromPage() {
  const links = document.querySelectorAll("a");

  if (links.length === 0) {
    showNotification("No links found in selection.");
    return;
  }

  const urls = Array.from(links).map(a => a.href);
  const textToCopy = urls.join("\n");

  navigator.clipboard.writeText(textToCopy).then(() => {
    showNotification(`${urls.length} link(s) copied to clipboard!`);
  }).catch(err => {
    console.error("Failed to copy: ", err);
    showNotification("Failed to copy links.");
  });
}