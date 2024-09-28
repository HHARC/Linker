document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addButton");
  const addLinkForm = document.getElementById("addLinkForm");
  const titleInput = document.getElementById("titleInput");
  const linkInput = document.getElementById("linkInput");
  const saveButton = document.getElementById("saveButton");
  const linkList = document.getElementById("linkList");

  addButton.addEventListener("click", () => {
    addLinkForm.classList.toggle("hidden");
  });

  saveButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const link = linkInput.value.trim();

    if (title && link) {
      addLink(title, link);
      saveLinks();
      titleInput.value = "";
      linkInput.value = "";
      addLinkForm.classList.add("hidden");
    }
  });

  function addLink(title, link) {
    const linkItem = document.createElement("div");
    linkItem.classList.add("link-item");
    linkItem.innerHTML = `
            <div class="link-info">
                <a href="${link}" target="_blank">${title}</a>
                <span class="link-url">${link}</span>
            </div>
            <button class="copy-button" data-link="${link}">
                <i class="fas fa-copy"></i> Copy
            </button>
        `;
    linkList.appendChild(linkItem);

    const copyButton = linkItem.querySelector(".copy-button");
    copyButton.addEventListener("click", () => {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          const originalText = copyButton.innerHTML;
          copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
          copyButton.disabled = true;
          setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.disabled = false;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  }
  // ... existing code ...

  function addLink(title, link) {
    const linkItem = document.createElement("div");
    linkItem.classList.add("link-item");
    linkItem.innerHTML = `
        <div class="link-info">
            <a href="${link}" target="_blank">${title}</a>
            <span class="link-url">${link}</span>
        </div>
        <div class="button-group">
            <button class="copy-button" data-link="${link}">
                <i class="fas fa-copy"></i> Copy
            </button>
            <button class="delete-button">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    linkList.appendChild(linkItem);

    const copyButton = linkItem.querySelector(".copy-button");
    copyButton.addEventListener("click", () => {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          const originalText = copyButton.innerHTML;
          copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
          copyButton.disabled = true;
          setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.disabled = false;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });

    const deleteButton = linkItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      linkList.removeChild(linkItem);
      saveLinks();
    });
  }

  // ... rest of the code ...

  function saveLinks() {
    const links = Array.from(linkList.children).map((item) => {
      const anchor = item.querySelector("a");
      return {
        title: anchor.textContent,
        link: anchor.href,
      };
    });
    localStorage.setItem("savedLinks", JSON.stringify(links));
  }

  function loadLinks() {
    const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
    savedLinks.forEach((item) => addLink(item.title, item.link));
  }

  loadLinks();
});
