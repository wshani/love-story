console.log("✅ script.js loaded");
let step = 0;

let currentItem = null;
let placedCount = 0;

const slotIds = ["slot1Img", "slot2Img", "slot3Img", "slot4Img", "slot5Img"];
const addedImages = new Set();

const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.4;

let musicStarted = false;

const data = [
    { text: "Our first memory 💕", img: "photo1.jpg" },
    { text: "You make me smile 😊", img: "photo2.jpg" },
    { text: "My favorite person ❤️", img: "photo3.jpg" },
    { text: "Forever together 💍", img: "photo4.jpg" },
    { text: "This is my heart for you 💘", img: "photo5.jpg" }
];

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

/* 1️⃣ START STORY */
// 

function nextStep() {
// ✅ start music on first user click
  if (!musicStarted) {
    bgMusic.play().catch(err => console.log("Music blocked:", err));
    musicStarted = true;
  }

    if (step >= data.length) return;

    const item = data[step];
    currentItem = item;

    document.getElementById("message").innerText = item.text;
    showPopup(item);
    drawHeart(step + 1);

    step++;

    console.log("STEP:", step);

    // if (step === data.length) {
    //     document.getElementById("yesBtn").style.display = "none";
    //     document.getElementById("noBtn").style.display = "none";
    //     document.getElementById("question").style.display = "none";

    //     document.getElementById("message").innerText = "I Love You Forever 💖💍 Happy Anniversary 💖";
    // }
}

/* POPUP */
// 

function showPopup(item) {
    const popup = document.getElementById("popup");
    const img = document.getElementById("popupImg");
    const text = document.getElementById("popupText");

    // img.src = "";
    // img.src = item.img;

    // text.innerText = item.text;

    // popup.style.display = "flex";
    // console.log("Popup image:", item.img);

    
    // img.src = item.img + "?v=" + Date.now(); // cache buster
    // text.innerText = item.text;

    
    img.src = item.img + "?v=" + Date.now();
    text.innerText = item.text;


    popup.style.display = "flex";

}

window.onload = () => {
    document.getElementById("popup").style.display = "none";
};

function closePopup() {
  document.getElementById("popup").style.display = "none";
  if (!currentItem) return;

  if (addedImages.has(currentItem.img)) return;
  addedImages.add(currentItem.img);

  if (placedCount >= slotIds.length) return;

  const id = slotIds[placedCount];
  const imgEl = document.getElementById(id);

  imgEl.src = currentItem.img + "?v=" + Date.now();
  imgEl.style.display = "block";

  // If this image goes into a normal slot, add border only after image shows
  const parentSlot = imgEl.closest(".slot");
  if (parentSlot) parentSlot.classList.add("filled");

  placedCount++;

  // ✅ After last image is placed:
  if (placedCount === slotIds.length) {
    document.getElementById("question").style.display = "none";
    document.querySelector(".btn-area").style.display = "none";
    document.getElementById("message").style.display = "none";

    // show final text
    document.getElementById("finalLove").style.display = "block";

    // show completed canvas heart ON TOP of image5
    drawHeart(5);
    document.getElementById("heartCanvas").style.display = "block";
  }
}

// function closePopup() {
//   document.getElementById("popup").style.display = "none";

//   if (!currentItem) return;

//   // prevent duplicates
//   if (addedImages.has(currentItem.img)) return;
//   addedImages.add(currentItem.img);

//   // if all slots are filled, do nothing
//   if (placedCount >= slotIds.length) return;

//   // place into next slot (1 -> 5)
//   const imgEl = document.getElementById(slotIds[placedCount]);
//   imgEl.src = currentItem.img + "?v=" + Date.now();
//   imgEl.style.display = "block";

//   placedCount++;

//   // if finished all images -> show final screen
//   if (placedCount === data.length) {
//     document.getElementById("question").style.display = "none";
//     document.querySelector(".btn-area").style.display = "none";
//     document.getElementById("message").style.display = "none";
//     document.getElementById("finalLove").style.display = "block";
//   }
// }

// function closePopup() {
//     document.getElementById("popup").style.display = "none";

// }

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
// function moveNo() {
// //   const btn = document.getElementById("noBtn");
// //   const area = document.querySelector(".btn-area");

// //   const maxX = area.clientWidth - btn.offsetWidth;
// //   const maxY = area.clientHeight - btn.offsetHeight;

// //   btn.style.left = Math.random() * maxX + "px";
// //   btn.style.top  = Math.random() * maxY + "px";

  
//   const btn = document.getElementById("noBtn");
//   const area = document.querySelector(".btn-area");

//   const maxX = area.clientWidth - btn.offsetWidth;
//   const maxY = area.clientHeight - btn.offsetHeight;

//   btn.style.left = Math.random() * maxX + "px";
//   btn.style.top  = Math.random() * maxY + "px";

// }


function isOverlapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}



function moveNo() {
    // const btn = document.getElementById("noBtn");
    // btn.style.left = Math.random() * 80 + "%";
    // btn.style.top = Math.random() * 80 + "%";
    
    const yesBtn = document.getElementById("yesBtn");

  const maxTries = 50;  // how many times to try before giving up
  const padding = 12;   // extra “safe gap” around Yes button

  for (let i = 0; i < maxTries; i++) {

    // your existing random movement
    noBtn.style.left = Math.random() * 80 + "%";
    noBtn.style.top  = Math.random() * 80 + "%";

    // measure after moving
    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // make a bigger "no-go zone" around Yes
    const safeYes = {
      left: yesRect.left - padding,
      right: yesRect.right + padding,
      top: yesRect.top - padding,
      bottom: yesRect.bottom + padding
    };

    // ✅ RULE: if not overlapping, keep this position and stop
    if (!isOverlapping(noRect, safeYes)) {
      return;
    }
  }

  // fallback (if screen is too small or cant find space)
  noBtn.style.left = "80%";
  noBtn.style.top = "80%";

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
// function shareWhatsApp() {
//     const link = window.location.href;
//     const text = `💖 Look what I made for you ❤️\n${link}`;
//     window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
// }

/* BUTTON CLICK */
// document.getElementById("yesBtn").addEventListener("click", nextStep);

document.getElementById("bgMusic").volume = 0.4;

// img.src = item.img + "?v=" + new Date().getTime();