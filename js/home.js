// Houd bestaande QR-codes met index.html?id=... werkend.
const legacyId = new URLSearchParams(location.search).get("id");
if (legacyId && PEOPLE[legacyId]) location.replace(`./herdenking.html?id=${encodeURIComponent(legacyId)}`);

const grid = document.getElementById("peopleGrid");
const search = document.getElementById("search");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");
const entries = Object.entries(PEOPLE).sort(([,a],[,b]) => {
  // Uitgelichte pagina's altijd eerst, daarna alfabetisch op naam.
  const highlightDifference = Number(Boolean(b.highlight)) - Number(Boolean(a.highlight));
  return highlightDifference || (a.name || "").localeCompare(b.name || "", "nl");
});

function render(query = "") {
  const needle = query.trim().toLocaleLowerCase("nl");
  const filtered = entries.filter(([,person]) => [person.name,person.born,person.died].filter(Boolean).join(" ").toLocaleLowerCase("nl").includes(needle));
  grid.replaceChildren(...filtered.map(([id,person]) => {
    const card = document.createElement("article");
    card.className = `person-card${person.highlight ? " person-card--highlight" : ""}`;
    const link = document.createElement("a"); link.className = "person-card__link"; link.href = `./herdenking.html?id=${encodeURIComponent(id)}`;
    const image = document.createElement("img"); image.className = "person-card__image"; image.src = person.heroPhoto; image.alt = ""; image.loading = "lazy";
    const body = document.createElement("div"); body.className = "person-card__body";
    const title = document.createElement("h3"); title.textContent = person.name || "Naamloos";
    const dates = document.createElement("p"); dates.textContent = [person.born,person.died].filter(Boolean).join(" – ") || "Bekijk het verhaal";
    body.append(title,dates);
    if (person.highlight) {
      const badge = document.createElement("span");
      badge.className = "person-card__badge";
      badge.textContent = "Uitgelicht";
      link.append(badge);
    }
    link.append(image,body); card.append(link); return card;
  }));
  count.textContent = `${filtered.length} ${filtered.length === 1 ? "pagina" : "pagina’s"}`;
  empty.hidden = filtered.length !== 0;
}
search.addEventListener("input", event => render(event.target.value));
render();
