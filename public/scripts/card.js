const button = document.getElementById("myButton");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");

button.addEventListener("mouseenter", (event) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = button.getBoundingClientRect();

    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let btnX = btnRect.left + btnRect.width / 2;
    let btnY = btnRect.top + btnRect.height / 2;

    let deltaX = btnX - mouseX;
    let deltaY = btnY - mouseY;

    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let moveFactor = 200; // Move farther away

    let newX = btnRect.left + (deltaX / distance) * moveFactor;
    let newY = btnRect.top + (deltaY / distance) * moveFactor;

    // Ensure the button stays inside the viewport and avoid corners
    if (newX < 50) newX = viewportWidth - btnRect.width - 100; // If too left, move right
    if (newX > viewportWidth - btnRect.width - 50) newX = 50; // If too right, move left

    if (newY < 50) newY = viewportHeight - btnRect.height - 100; // If too top, move down
    if (newY > viewportHeight - btnRect.height - 50) newY = 50; // If too bottom, move up

    // Apply the new position
    button.style.position = "fixed";
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
});

yesBtn.addEventListener("click", () => {
    question.innerHTML = "Sure ?";
    question.style.color = "red";
    yesBtn.addEventListener("click", () => {
        question.innerHTML = `<h2>love you</h2><h4 style="color: black;">wanna connect?</h4>`;
        question.style.color = "red";
        question.style.fontSize = "1.5rem";
        button.style.display = "none";
        yesBtn.innerText = "Yup !";
        yesBtn.style.backgroundColor = "red";
        yesBtn.style.color = "white";
        yesBtn.addEventListener("click", () => {
            window.location.href = "chat.html";
        });
    });
});


function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";

    document.querySelector(".love-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

console.log("Script loaded and running!");