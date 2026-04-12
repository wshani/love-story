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
// 

function nextStep() {
    if (step >= data.length) return;

    const item = data[step];

    document.getElementById("message").innerText = item.text;
    showPopup(item);
    drawHeart(step + 1);

    step++;

    console.log("STEP:", step);
}

/* POPUP */
// 

function showPopup(item) {
    const popup = document.getElementById("popup");
    const img = document.getElementById("popupImg");
    const text = document.getElementById("popupText");

    img.src = "";
    img.src = item.img;

    text.innerText = item.text;

    popup.style.display = "flex";
    console.log("Popup image:", item.img);
}

window.onload = () => {
    document.getElementById("popup").style.display = "none";
};

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* HEART DRAW */
// function drawHeart(level) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.strokeStyle = "red";
//     ctx.beginPath();

//     for (let x = -2; x <= 2; x += 0.01) {
//         let y = Math.pow(Math.abs(x), 2 / 3) +
//                 0.8 * Math.cos(level * x);

//         let scale = 80;
//         let px = 200 + x * scale;
//         let py = 200 - y * scale;

//         ctx.lineTo(px, py);
//     }

//     ctx.stroke();
// }

function drawHeart(level) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    ctx.beginPath();

    for (let t = 0; t < Math.PI * 2 * (level / 5); t += 0.01) {

        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t)
              - 5 * Math.cos(2 * t)
              - 2 * Math.cos(3 * t)
              - Math.cos(4 * t);

        let scale = 10;

        let px = canvas.width / 2 + x * scale;
        let py = canvas.height / 2 - y * scale;

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
/*
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
*/

/* WHATSAPP SHARE */
function shareWhatsApp() {
    const link = window.location.href;
    const text = `💖 Look what I made for you ❤️\n${link}`;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
}

/* BUTTON CLICK */
// document.getElementById("yesBtn").addEventListener("click", nextStep);

document.getElementById("bgMusic").volume = 0.4;

img.src = item.img + "?v=" + new Date().getTime();