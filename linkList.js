chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extract-links",
    title: "Extract Links from Selection",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "extract-links") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractAndCopyLinks
    });
  }
});

// This function is self-contained. 
// It includes the notification logic inside it so Chrome can serialize it correctly.
function extractAndCopyLinks() {
  // --- Helper function defined inside ---
  function showNotification(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "4px";
    toast.style.zIndex = "10000";
    toast.style.fontFamily = "sans-serif";
    toast.style.fontSize = "14px";
    toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
  // -------------------------------------

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

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