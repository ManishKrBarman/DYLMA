function calculateLove() {
    let name1 = document.getElementById("name1").value.trim().toLowerCase();
    let name2 = document.getElementById("name2").value.trim().toLowerCase();
    let resultDiv = document.getElementById("result");

    if (name1 === "" || name2 === "") {
        resultDiv.innerHTML = "Please enter both names!";
        return;
    }

    name1 = name1.replace(/\s/g, "");
    name2 = name2.replace(/\s/g, "");

    let totalLength = name1.length + name2.length;
    let matchCount = 0;

    for (let char of name1) {
        if (name2.includes(char)) {
            matchCount++;
        }
    }

    let percentage = Math.min(100, Math.round((matchCount / totalLength) * 100) + 30);
    if (percentage < 30) percentage = 30;

    let flames = ["F", "L", "A", "M", "E", "S"];
    let name1Arr = name1.split("");
    let name2Arr = name2.split("");

    for (let char of name1Arr) {
        let index = name2Arr.indexOf(char);
        if (index !== -1) {
            name2Arr.splice(index, 1);
            name1Arr.splice(name1Arr.indexOf(char), 1);
        }
    }

    let count = name1Arr.length + name2Arr.length;
    let index = 0;

    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }

    let relationship = {
        F: "Friends 💛",
        L: "Love ❤️",
        A: "Affection 💕",
        M: "Marriage 💍",
        E: "Enemies ⚡",
        S: "Siblings 👫",
    };

    resultDiv.innerHTML = `💖 ${name1.charAt(0).toUpperCase() + name1.slice(1)} & 
        ${name2.charAt(0).toUpperCase() + name2.slice(1)} have a <strong>${percentage}%</strong> love compatibility!<br>
        Relationship Prediction: <strong>${relationship[flames[0]]}</strong>`;
}

// Floating Hearts Animation
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);
