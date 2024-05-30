function openConfirmModal() {
  const message = document.getElementById("message").value;
  if (!message) {
    openErrorModal("祝福的話不要吝嗇啦🥺！");
  } else {
    document.getElementById("confirmModal").style.display = "block";
  }
}

function closeConfirmModal() {
  document.getElementById("confirmModal").style.display = "none";
}

function openSuccessModal() {
  document.getElementById("successModal").style.display = "block";
}

function closeSuccessModal() {
  document.getElementById("successModal").style.display = "none";
}

function openErrorModal(message) {
  document.getElementById("errorMessage").innerText = message;
  document.getElementById("errorModal").style.display = "block";
}

function closeErrorModal() {
  document.getElementById("errorModal").style.display = "none";
}

function sendMessage() {
  const hint = document.getElementById("hint").value;
  const message = document.getElementById("message").value;

  fetch("/add_message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hint, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        closeConfirmModal();
        openSuccessModal();
        document.getElementById("hint").value = "";
        document.getElementById("message").value = "";
      } else {
        openErrorModal("Failed to send message: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      openErrorModal("Failed to send message: " + error.message);
    });
}
