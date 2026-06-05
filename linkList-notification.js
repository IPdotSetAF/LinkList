function showNotification(message) {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.bottom = "20px";
    host.style.right = "20px";
    host.style.zIndex = "2147483647";
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        all: initial;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 2147483647;
      }

      .toast {
        all: initial;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: sans-serif;
        font-size: 14px;
        padding: 10px 18px;
        border-radius: 999px;
        border: 2px solid #29abe2;
        box-shadow: 0 6px 20px rgba(0,0,0,0.18);
        backdrop-filter: blur(4px);
        transition: opacity 0.5s, transform 0.35s;
        background: rgba(255,255,255,0.6);
        color: #111;
      }

      @media (prefers-color-scheme: dark) {
        .toast {
          background: rgba(20,24,30,0.6);
          color: #f5f7fb;
          border-color: rgba(60,130,210,0.8);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
      }

      img {
        width: 20px;
        height: 20px;
      }
    `;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.dir = "ltr";
    toast.style.transition = "opacity 0.5s, transform 0.35s";

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("icons/LinkList.svg");

    const text = document.createElement("span");
    text.textContent = message;

    toast.appendChild(img);
    toast.appendChild(text);

    shadow.appendChild(style);
    shadow.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(50px)";

        setTimeout(() => {
            host.remove();
        }, 500);
    }, 5000);
}