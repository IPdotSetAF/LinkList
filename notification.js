function showNotification(message) {
    const toast = document.createElement("div");
    
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("icons/LinkList.svg"); 
    img.style.width = "20px";  // Adjust size as needed
    img.style.height = "20px";
    img.style.verticalAlign = "middle";
    img.style.marginRight = "10px"; // Space between image and text
    img.style.display = "inline-block";

    const textNode = document.createTextNode(message);

    toast.appendChild(img);
    toast.appendChild(textNode);

    toast.dir = "ltr";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "4px";
    toast.style.border = "1px solid #fff";
    toast.style.zIndex = "10000";
    toast.style.fontFamily = "sans-serif";
    toast.style.fontSize = "14px";
    toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    
    toast.style.display = "flex";
    toast.style.alignItems = "center";

    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s";
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}