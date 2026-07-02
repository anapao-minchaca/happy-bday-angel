const intro = document.getElementById("intro");
const scrapbook = document.getElementById("scrapbook");
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const openBtn = document.getElementById("openBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toast = document.getElementById("toast");

let spread = 0;

function sticker(src, alt, action = "achievement('Sticker Found')") {
  return `<img class="sticker-img" src="${src}" alt="${alt}" onclick="${action}">`;
}

const pages = [
  {
    html: `
      <h2 class="page-title">Un cumpleañero muy especial</h2>
      <div class="polaroid">
        <img src="assets/photos/angel-1.jpg" alt="childhood photo">
        <div class="caption">Mini Ángel 🤏</div>
      </div>
      <p class="hand">Quién diría que este pequeñito crecería para convertirse en una de las personas más nobles, preciosas y especiales que he conocido. 🤍</p>
      <p class="tiny-secret hand">
        psst... los stickers son clickeables ✨
      </p>
      <div class="scattered-stickers">
        <img class="sticker-img sticker-piano" src="assets/stickers/piano-cat.png" onclick="achievement('Best piano player')" alt="">
        <img class="sticker-img sticker-ring" src="assets/stickers/ring.png" onclick="ringEffect()" alt="">
        <img class="sticker-img sticker-buff" src="assets/stickers/buff-cat.png" onclick="achievement('Cutest gym rat')" alt="">
        <img class="sticker-img sticker-potato" src="assets/stickers/potato.png" onclick="confetti()" alt="">
      </div>
    `
  },
  {
    className: "image-page",
    html: `<img class="full-page-image" src="assets/photos/birthday-page.jpeg" alt="birthday collage">`
  },
  {
    html: `
      <h2 class="page-title">Un pedacito de nosotros</h2>
      <p class="hand">Haz click en cada foto para una nota especial ✨</p><br>

      <div class="memory-grid">
        <div class="memory-card" style="--r:-3deg" onclick="this.classList.toggle('flipped')">
          <div class="memory-inner">
            <div class="memory-front">
              <img src="assets/photos/angel-yo-1.jpg" alt="memory photo">
              <span>Te</span>
            </div>
            <div class="memory-back hand">
              <p>Los mejores recuerdos siempre terminan teniéndote a ti en ellos.</p>
              <small>♡</small>
            </div>
          </div>
        </div>

        <div class="memory-card" style="--r:2deg" onclick="this.classList.toggle('flipped')">
          <div class="memory-inner">
            <div class="memory-front">
              <img src="assets/photos/angel-yo-3.jpg" alt="memory photo">
              <span>quiero</span>
            </div>
            <div class="memory-back hand">
              <p>Gracias por hacer que los momentos simples se sientan especiales.</p>
              <small>♡</small>
            </div>
          </div>
        </div>

        <div class="memory-card" style="--r:3deg" onclick="this.classList.toggle('flipped')">
          <div class="memory-inner">
            <div class="memory-front">
              <img src="assets/photos/angel-yo-2.jpg" alt="memory photo">
              <span>demasiado</span>
            </div>
            <div class="memory-back hand">
              <p>Esta foto me recuerda lo bonito que se siente estar contigo.</p>
              <small>♡</small>
            </div>
          </div>
        </div>

        <div class="memory-card" style="--r:-2deg" onclick="this.classList.toggle('flipped')">
          <div class="memory-inner">
            <div class="memory-front">
              <img src="assets/photos/angel-yo-4.jpg" alt="memory photo">
              <span>precioso 🤍</span>
            </div>
            <div class="memory-back hand">
              <p>Espero que sigamos guardando mil pedacitos más de nosotros.</p>
              <small>♡</small>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    html: `
      <h2 class="page-title">Cosas que amo de ti</h2>
      <div class="note hand">Me haces sentir segura siendo exactamente quien soy.</div>
      <div class="note hand">Admiro el corazón tan bonito que tienes con las personas que amas.</div>
      <div class="note hand">Gracias por escucharme incluso cuando no sé cómo explicar lo que siento.</div>
      <div class="note hand">Siempre das lo mejor de ti, incluso cuando estás cansado.</div>
      <div class="heart-strip">
        <img src="assets/stickers/heart-strip.png" alt="heart ribbon">
      </div>
    `
  },
  {
    html: `
      <h2 class="page-title">Una carta para ti</h2>
      <p class="letter">
        Querido Ángel,<br><br>
        Feliz cumpleaños. 🤍
        Gracias por llegar a mi vida y hacer que estos meses hayan sido tan especiales. Gracias por escucharme, por hacerme sentir segura, por nuestras pláticas interminables, nuestras risas y todos esos pequeños momentos que hoy son de mis recuerdos favoritos.

        Espero que este nuevo año te traiga muchísima felicidad y que nunca olvides lo especial que eres para las personas que te queremos.

        Y, egoístamente, espero poder seguir acompañándote y creando muchísimos recuerdos más contigo.
        <br><br>
        Te quiere con todo su corazón,
        tu twin loba. ❤️
      </p>
    `
  },
  {
    html: `
      <h2 class="page-title">Llegaste al final</h2>

      <div class="ending-card">
        <p class="hand">
          Mi parte favorita de hacerte esto...
          Fue pensar en ti en cada página. 🤍
        </p>
      </div>

      <div class="reward">
        <img class="reward-gif" src="assets/stickers/gift.png" alt="gift">
        <h3>🎁 Regalo desbloqueado</h3>
        <p class="hand">
          <b>Un set de LEGO :O</b><br>
          Espera para descubrir de qué es!!
        </p>

        <button class="primary-btn" onclick="openFinalSurprise()">Solo una cosita más...</button>
      </div>

      <p class="ending-small hand">Fin... por ahora.</p>

      <div class="final-modal hidden" id="finalModal">
        <div class="final-note">
          <button class="modal-close" onclick="closeFinalSurprise()">×</button>
          <h3>🎉 ¡Felicidades hermoso!</h3>
          <p class="hand">
            Espero que este sea solamente el primero de muchos cumpleaños
            que pueda celebrar contigo.<br><br>
            Gracias por existir, por quererme y por dejarme quererte.
          </p>
          <p class="signature hand">Con amor,<br>Ana Pao ❤️</p>
        </div>
      </div>
    `
  }
];

function render() {
  const isMobile = window.innerWidth <= 820;

  leftPage.className = "page left-page";
  rightPage.className = "page right-page";

  if (isMobile) {
    leftPage.innerHTML = "";
    rightPage.innerHTML = pages[spread].html;
    if (pages[spread].className) rightPage.classList.add(pages[spread].className);
    prevBtn.disabled = spread === 0;
    nextBtn.disabled = spread === pages.length - 1;
  } else {
    const leftIndex = spread * 2;
    const rightIndex = leftIndex + 1;

    leftPage.innerHTML = pages[leftIndex]?.html || "";
    rightPage.innerHTML = pages[rightIndex]?.html || "";

    if (pages[leftIndex]?.className) leftPage.classList.add(pages[leftIndex].className);
    if (pages[rightIndex]?.className) rightPage.classList.add(pages[rightIndex].className);

    prevBtn.disabled = spread === 0;
    nextBtn.disabled = rightIndex >= pages.length - 1;
  }
}

openBtn.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  music.volume = 0.25;
  music.play();
  intro.classList.add("hidden");
  scrapbook.classList.remove("hidden");
  render();
});

nextBtn.addEventListener("click", () => {
  const isMobile = window.innerWidth <= 820;
  const maxSpread = isMobile ? pages.length - 1 : Math.ceil(pages.length / 2) - 1;
  if (spread < maxSpread) {
    spread++;
    render();
  }
});

prevBtn.addEventListener("click", () => {
  if (spread > 0) {
    spread--;
    render();
  }
});

window.addEventListener("resize", render);

function achievement(name) {
  showToast(`🏆 Achievement unlocked: ${name}`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2200);
}

function ringEffect() {
  document.body.style.filter = "brightness(.72)";
  showToast("💍 My precious...");
  setTimeout(() => document.body.style.filter = "none", 1400);
}

function createSparkle(x, y, symbol = "✨") {
  const piece = document.createElement("div");
  piece.className = "sparkle";
  piece.textContent = symbol;
  piece.style.left = x + "px";
  piece.style.top = y + "px";
  document.body.appendChild(piece);
  setTimeout(() => piece.remove(), 900);
}

function confetti() {
  showToast("🎉 ¡Feliz cumpleaños precioso!");
  for (let i = 0; i < 70; i++) {
    createSparkle(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
      ["✨", "⭐", "❤️", "🎉"][Math.floor(Math.random() * 4)]
    );
  }
}

/* Sparkles following the mouse */
document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.88) {
    createSparkle(e.clientX, e.clientY, "✨");
  }
});

/* Soft random sparkles around the scrapbook */
setInterval(() => {
  if (scrapbook.classList.contains("hidden")) return;

  const sparkle = document.createElement("div");
  sparkle.className = "ambient-sparkle";
  sparkle.textContent = "✨";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1500);
}, 650);

function openFinalSurprise() {
  confetti();
  const modal = document.getElementById("finalModal");
  if (modal) modal.classList.remove("hidden");

  const rewardImg = document.querySelector(".reward-gif");
  if (rewardImg) {
    rewardImg.classList.add("wiggle");
    setTimeout(() => rewardImg.classList.remove("wiggle"), 900);
  }
}

function closeFinalSurprise() {
  const modal = document.getElementById("finalModal");
  if (modal) modal.classList.add("hidden");
}