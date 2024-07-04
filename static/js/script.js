const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function animateNavItem (idSelector){

    document.querySelector(idSelector).onmouseover = function (event) {
        let iterations = 0;
        const interval = setInterval(
            function splitMapJoinIterateNavItem() {
                event.target.innerText = event.target.innerText.split("")

                    .map(
                        function randomizeAndReset(letter, index) {
                            if(index < iterations) {
                                return event.target.dataset.value[index];
                            }
                            return letters[Math.floor(Math.random() * 36)]
                        })

                    .join("");

                if(iterations >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }

                iterations = iterations + 1 / 3;
            }, 30);
    }
}

animateNavItem("#about")
animateNavItem("#projects")
animateNavItem("#content")
animateNavItem("#resume")
animateNavItem("#getInTouch")