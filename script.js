// GSAP animations
gsap.from(".animate-text", { y: -50, opacity: 0, duration: 1.5, ease: "power3.out" });
gsap.from(".animate-sub", { y: 50, opacity: 0, duration: 2, delay: 0.5 });

gsap.utils.toArray(".card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});
