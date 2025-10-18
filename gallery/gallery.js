// ===============================
// GALLERY LIGHTBOX FUNCTIONALITY
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close-lightbox");

  // Open lightbox when an image is clicked
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.style.display = "none";
  });

  // Event cards and sub-gallery toggle
  const eventCards = document.querySelectorAll(".event-card");
  const subGalleries = document.querySelectorAll(".sub-gallery");

  eventCards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetId = card.getAttribute("data-target");
      const targetGallery = document.getElementById(targetId);

      if (!targetGallery) return; // avoid errors if ID not found

      // Hide all sub-galleries
      subGalleries.forEach((gallery) => gallery.classList.remove("active"));

      // Show clicked gallery
      targetGallery.classList.add("active");

      // Scroll into view
      targetGallery.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
