document.addEventListener("DOMContentLoaded", function () {
  fetchMessages();
});

function fetchMessages() {
  fetch("/get_messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        displayBarrageMessages(data);
      } else {
        console.error("Failed to fetch messages:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayBarrageMessages(messages) {
  const barrageContainer = document.getElementById("barrage-container");
  barrageContainer.innerHTML = ""; // 清空彈幕區域
  messages.forEach((msg) => {
    const messageElement = document.createElement("div");
    messageElement.className = "barrage-message";
    messageElement.innerText = msg.message;
    messageElement.style.top = `${Math.random() * 100}%`; // 隨機頂部位置
    messageElement.style.left = "50%"; // 初始位置在右側
    messageElement.style.animationDuration = `${Math.random() * 1.5 + 2}s`; // 隨機動畫時長3-6秒
    barrageContainer.appendChild(messageElement);

    // 移除彈幕消息
    messageElement.addEventListener("animationend", () => {
      messageElement.remove();
    });
  });
}
