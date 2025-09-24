document.addEventListener("DOMContentLoaded", () => {
  // Progress circle
  document.querySelectorAll(".progress-circle").forEach((circle) => {
    const progress = circle.getAttribute("data-progress");
    circle.style.setProperty("--progress", `${progress * 3.6}deg`);
  });

  function animateProgress(circle) {
    const target = parseInt(circle.getAttribute("data-progress"));
    let current = 0;
    const valueSpan = circle.querySelector(".progress-value");

    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
      } else {
        current++;
        circle.style.setProperty("--progress", `${current * 3.6}deg`);
        valueSpan.textContent = `${current}%`;
      }
    }, 15); // Adjust speed of animation
  }

  // Scroll-triggered animation
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll(".progress-circle")
            .forEach((circle) => {
              animateProgress(circle);
            });
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.3 }
  );

  // Observe the technical skills row
  document.querySelectorAll("#technical-skills-row").forEach((section) => {
    observer.observe(section);
  });

  document
    .querySelectorAll("#professional-skills .progress-bar")
    .forEach((bar) => {
      bar.style.width = "0%";
    });

  const observer2 = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".progress-bar").forEach((bar) => {
            const value = bar.getAttribute("aria-valuenow");
            bar.style.width = value + "%";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("#professional-skills").forEach((section) => {
    observer2.observe(section);
  });

  // Contact form submission
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  });
});
