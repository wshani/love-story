let step = 0;

const data = [
    { text: "Our first memory 💕", img: "photo1.jpg" },
    { text: "You make me smile 😊", img: "photo2.jpg" },
    { text: "My favorite person ❤️", img: "photo3.jpg" },
    { text: "Forever together 💍", img: "photo4.jpg" },
    { text: "This is my heart for you 💘", img: "photo5.jpg" }
];

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let musicStarted = false;

/* 1️⃣ START STORY */
function startStory() {
    if (!musicStarted) {
        document.getElementById("bgMusic").play();
        musicStarted = true;
    }

    nextStep();
}

/* 2️⃣ NEXT STEP FLOW */
function nextStep() {
    if (step < data.length) {
        document.getElementById("message").innerText = data[step].text;
        showPopup(data[step]);
        drawHeart(step + 1);

        // ❤️ HEART GLOW UPDATE (YOUR LINE ADDED HERE)
        document.querySelector(".heart").style.boxShadow =
            `0 0 ${20 + step * 10}px #ff4d6d`;

        step++;
    }

    if (step === data.length) {
        document.getElementById("question").innerText = "I LOVE YOU FOREVER ❤️";
        launchConfetti();
    }
}

/* POPUP */
function showPopup(item) {
    document.getElementById("popupImg").src = item.img;
    document.getElementById("popupText").innerText = item.text;
    document.getElementById("popup").style.display = "block";

    setTimeout(() => {
        closePopup();
    }, 2000);
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* HEART DRAW */
function drawHeart(level) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.beginPath();

    for (let x = -2; x <= 2; x += 0.01) {
        let y = Math.pow(Math.abs(x), 2 / 3) +
                0.8 * Math.cos(level * x);

        let scale = 80;
        let px = 200 + x * scale;
        let py = 200 - y * scale;

        ctx.lineTo(px, py);
    }

    ctx.stroke();
}

/* NO BUTTON MOVE */
function moveNo() {
    const btn = document.getElementById("noBtn");
    btn.style.left = Math.random() * 80 + "%";
    btn.style.top = Math.random() * 80 + "%";
}

/* CONFETTI */
function launchConfetti() {
    for (let i = 0; i < 120; i++) {
        let conf = document.createElement("div");
        conf.style.position = "fixed";
        conf.style.width = "6px";
        conf.style.height = "6px";
        conf.style.background = "red";
        conf.style.left = Math.random() * window.innerWidth + "px";
        conf.style.top = "0px";
        document.body.appendChild(conf);

        let fall = setInterval(() => {
            conf.style.top = conf.offsetTop + 5 + "px";
            if (conf.offsetTop > window.innerHeight) {
                clearInterval(fall);
                conf.remove();
            }
        }, 20);
    }
}

/* WHATSAPP SHARE */
function shareWhatsApp() {
    const link = window.location.href;
    const text = `💖 Look what I made for you ❤️\n${link}`;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
}

/* BUTTON CLICK */
document.getElementById("yesBtn").addEventListener("click", nextStep);

document.getElementById("bgMusic").volume = 0.4;