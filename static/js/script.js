const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function scramble(element) {
    if (reduceMotion.matches) return;

    const target = element.dataset.value;
    let iterations = 0;

    clearInterval(element.scrambleInterval);
    element.scrambleInterval = setInterval(() => {
        element.textContent = target
            .split("")
            .map((letter, index) =>
                index < iterations ? target[index] : letters[Math.floor(Math.random() * letters.length)]
            )
            .join("");

        if (iterations >= target.length) {
            clearInterval(element.scrambleInterval);
            element.textContent = target;
        }

        iterations += 1 / 3;
    }, 30);
}

document.querySelectorAll(".animatedNavItem").forEach((item) => {
    item.addEventListener("mouseenter", () => scramble(item));
    item.addEventListener("focus", () => scramble(item));
});

document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
});
