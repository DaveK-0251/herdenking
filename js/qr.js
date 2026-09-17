const button = document.getElementById("btn");
const picker = document.getElementById("pid");
const output = document.getElementById("out");
Object.entries(PEOPLE).sort(([,a],[,b]) => (a.name || "").localeCompare(b.name || "", "nl")).forEach(([id,person]) => { const option = document.createElement("option"); option.value = id; option.textContent = `${person.name} (${id})`; picker.append(option); });
button.addEventListener("click", () => {
  const id = picker.value;
  const pageUrl = new URL(`./herdenking.html?id=${encodeURIComponent(id)}`, location.href).href;
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(pageUrl);
  output.replaceChildren();
  const text = document.createElement("p"), strong = document.createElement("strong"), link = document.createElement("a");
  strong.textContent = "Link: "; link.href = pageUrl; link.textContent = pageUrl; text.append(strong,link);
  const image = document.createElement("img"); image.src = qrUrl; image.alt = `QR-code voor ${PEOPLE[id].name}`;
  const help = document.createElement("p"); help.textContent = "Houd de QR-code ingedrukt om hem op je telefoon op te slaan.";
  output.append(text,image,help);
});
