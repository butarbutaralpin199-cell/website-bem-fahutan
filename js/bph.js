document.addEventListener("DOMContentLoaded", () => {
  const leaders = document.querySelectorAll(".leader-horizontal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.3 }
  );

  leaders.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    observer.observe(card);
  });
});
