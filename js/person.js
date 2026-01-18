// js/person.js
const params = new URLSearchParams(location.search);
const id = params.get("id") || "001"; // default voor test
const p = PEOPLE[id];

const heroImg = document.getElementById("heroImg");
const nameEl = document.getElementById("name");
const datesEl = document.getElementById("dates");
const bioEl = document.getElementById("bio");

if (!p) {
  nameEl.textContent = "Pagina niet gevonden";
  datesEl.textContent = "";
  bioEl.textContent = "Deze QR-code verwijst naar een onbekende pagina.";
} else {
  nameEl.textContent = p.name || "";
  datesEl.textContent = [
    p.born ? `Geboren: ${p.born}` : null,
    p.died ? `Overleden: ${p.died}` : null
  ].filter(Boolean).join(" • ");

  bioEl.textContent = p.bio || "";
  if (p.heroPhoto) heroImg.src = p.heroPhoto;
  heroImg.alt = `Foto van ${p.name || "persoon"}`;
}

const photoListEl = document.getElementById("photoList");

// Extra foto's tonen (max 5)
photoListEl.innerHTML = "";

const extraPhotos = (p.photos || []).slice(0, 5);

extraPhotos.forEach((src, i) => {
  const frame = document.createElement("div");
  frame.className = "photoFrame";

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Foto van ${p.name}`;
  img.loading = "lazy";
  img.className = `photo ${i % 2 === 0 ? "slide-left" : "slide-right"}`;

  frame.appendChild(img);
  photoListEl.appendChild(frame);
});

// Slide-in animatie als ze in beeld komen
const photos = document.querySelectorAll(".photo");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

photos.forEach((photo, i) => {
  photo.style.transitionDelay = `${i * 90}ms`;
  io.observe(photo);
});
