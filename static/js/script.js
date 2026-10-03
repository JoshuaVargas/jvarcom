const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function scramble(el) {
    if (reduceMotion.matches) return;

    const target = el.dataset.value;
    let iterations = 0;

    // restarting mid-animation shouldn't stack timers
    clearInterval(el._scrambleTimer);
    el._scrambleTimer = setInterval(() => {
        el.textContent = [...target]
            .map((letter, i) =>
                i < iterations ? letter : LETTERS[Math.floor(Math.random() * LETTERS.length)]
            )
            .join("");

        if (iterations >= target.length) {
            clearInterval(el._scrambleTimer);
            el.textContent = target;
        }
        iterations += 1 / 3;
    }, 30);
}

document.querySelectorAll(".animatedNavItem").forEach((el) => {
    // screen readers get the real word, not the scrambled text
    el.setAttribute("aria-label", el.dataset.value);
    el.addEventListener("mouseenter", () => scramble(el));
    el.addEventListener("focus", () => scramble(el));
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
