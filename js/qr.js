const btn = document.getElementById("btn");
const pid = document.getElementById("pid");
const out = document.getElementById("out");

// pas dit aan naar jouw echte domein zodra je live bent
const BASE_URL = "https://davek-0251.github.io/herdenking/index.html?id=";

btn.addEventListener("click", () => {
  const id = pid.value.trim();
  if(!id) return alert("Vul een ID in, bv 001");

  const url = BASE_URL + encodeURIComponent(id);

  // QR als afbeelding (API)
  const qrImgUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(url);

  out.innerHTML = `
    <p><b>Link:</b> <a href="${url}" target="_blank">${url}</a></p>
    <img src="${qrImgUrl}" alt="QR code">
    <p>Rechtsklik op de QR → afbeelding opslaan</p>
  `;
});
