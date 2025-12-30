document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".coming-title");

  setInterval(() => {
    title.classList.toggle("pulse");
  }, 3000);
});
