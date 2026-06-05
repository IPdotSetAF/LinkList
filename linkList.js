function copyLinksToClipboard(links) {
  if (links.length === 0) {
    showNotification("No links found");
    return;
  }

  const urls = Array.from(links).map(a => a.href);
  const textToCopy = urls.join("\n");

  navigator.clipboard.writeText(textToCopy).then(() => {
    if (urls.length === 1)
      showNotification("1 link copied to clipboard");
    else
      showNotification(`${urls.length} links copied to clipboard`);
  }).catch(err => {
    console.error("Failed to copy: ", err);
    showNotification("Failed to copy links");
  });
}