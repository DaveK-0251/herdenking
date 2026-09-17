const params = new URLSearchParams(location.search);
const id = params.get("id");
const person = id ? PEOPLE[id] : null;
const memorial = document.getElementById("memorial");
const notFound = document.getElementById("notFound");
if (!person) {
  memorial.hidden = true; notFound.hidden = false; document.title = "Pagina niet gevonden | Herinneringen Duinrust";
} else {
  const name = person.name || "Herdenkingspagina";
  document.title = `${name} | Herinneringen Duinrust`;
  document.querySelector('meta[name="description"]').content = `Herdenkingspagina van ${name} op Begraafplaats Duinrust.`;
  document.getElementById("name").textContent = name;
  document.getElementById("dates").textContent = [person.born ? `Geboren ${person.born}` : "", person.died ? `Overleden ${person.died}` : ""].filter(Boolean).join(" · ");
  const hero = document.getElementById("heroImg"); hero.src = person.heroPhoto; hero.alt = `Hoofdfoto van ${name}`;
  document.getElementById("bio").textContent = person.bio || "";
  const gallery = document.getElementById("photoList");
  const photos = Array.isArray(person.photos) ? person.photos : [];
  document.getElementById("gallerySection").hidden = photos.length === 0;
  photos.forEach(src => { const figure = document.createElement("figure"); figure.className = "photo-frame"; const image = document.createElement("img"); image.className = "photo"; image.src = src; image.alt = `Foto bij de herdenking van ${name}`; image.loading = "lazy"; figure.append(image); gallery.append(figure); });
  const observer = new IntersectionObserver(items => items.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), {threshold:.12});
  document.querySelectorAll(".photo").forEach(photo => observer.observe(photo));
}
