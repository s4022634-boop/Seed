let scenes = [];
let currentScene = 0;
let textIndex = 0;
let typing = false;
let displayText = "";
let currentOverlaySound = null;
let bgm = new Audio("image/background music_1.mp3");
bgm.loop = true;
bgm.volume = 0.6;
let isMuted = false;

const textbox = document.getElementById("textbox");
const textboxText = document.getElementById("textbox-text");
const overlay = document.getElementById("overlay-text");
const hint = document.getElementById("continue-hint");
const bg = document.getElementById("background");
const sprite = document.getElementById("sprite");
const textboxArrow = document.getElementById("textbox-arrow");
const startBtn = document.getElementById("start-btn");
const cwScreen = document.getElementById("content-warning");
const gameContainer = document.getElementById("game-container");
const muteIcon = document.getElementById("mute-icon");


startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  cwScreen.style.display = "flex";
});

gameContainer.style.display = "none";

// === Mute controls ===
function updateMuteIcon() {
  muteIcon.src = isMuted ? "image/mute.png" : "image/unmute.png";
  bgm.muted = isMuted;
}
muteIcon.addEventListener("click", () => {
  isMuted = !isMuted;
  updateMuteIcon();
});
updateMuteIcon();
document.addEventListener("visibilitychange", () => {
  if (document.hidden) bgm.pause();
  else if (!isMuted) bgm.play().catch(e => console.log("BGM play prevented:", e));
});

// === Start Menu → CW ===
startBtn.addEventListener("click", () => {
  menu.style.display = "none";
  cwScreen.style.display = "flex";
});

// === Start Game after CW ===
function startGameFromCW() {
  cwScreen.style.display = "none";
  gameContainer.style.display = "block";
  bgm.play().catch(e => console.log("BGM play prevented:", e));
  startGame();
}


cwScreen.addEventListener("click", startGameFromCW);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && cwScreen.style.display === "flex") {
    e.preventDefault();
    startGameFromCW();
  } else if (e.code === "KeyM") {
    isMuted = !isMuted;
    updateMuteIcon();
  }
});

// === Keyboard controls ===
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (typing) finishText();
    else nextScene();
  }
  if (e.code === "KeyM") {
    isMuted = !isMuted;
    updateMuteIcon();
  }

  if (e.code === "Space" && cwScreen.style.display === "flex") {
    cwScreen.style.display = "none";
    hint.style.display = "none";
    gameContainer.style.display = "block";

    bgm.play().catch(e => console.log("BGM play prevented:", e));
    startGame();
  }
});




function startGame() {
  bgm.play().catch(e => console.log("BGM autoplay prevented:", e));
  scenes = [

    //===PART 1===
    { type: "overlay", text: "It’s morning… I guess I should wake it up." },
    { type: "textbox", text: "Pot! Rise and shine!", bg: "image/door_young.png" },
    { type: "knock", bg: "image/door_young.png", sound: "image/knocking door.mp3" },
    { type: "textbox", text: "Pot: Yawn! I’m up!!", bg: "image/room_1.png", sprite: "image/young pot_idle.png", sound: "image/open door.mp3" },
    { type: "textbox", text: "Morning. How was your sleep?", sprite: "image/young pot_idle.png" },
    { type: "textbox", text: "Pot: Good! I had a dream! I was flying in the sky and I saw a field full of flowers! They were glowing! I tried to pick one but then I woke up…", sprite: "image/young pot_happy.png" },
    { type: "textbox", text: "Sounds like a wonderful dream!.<br>Maybe we’ll see real flowers one day.", sprite: "image/young pot_happy.png" },
    { type: "textbox", text: "Alright, I’ll go and make you some breakfast.<br>Just keep your toys off the floor, alright?", sprite: "image/young pot_happy.png" },
    { type: "textbox", text: "Pot: Ok!!", sprite: "image/young pot_idle.png" },

    //===PART 2===
    { type: "transition" },
    { type: "overlay", text: "Later that day… faint clatter inside.", sound: "crash_1.mp3" },
    { type: "transition" },
    { type: "NoText", bg: "image/door_young.png" },
    { type: "knock", bg: "image/door_young.png", sound: "image/knocking door.mp3" },
    { type: "textbox", bg: "image/room_1.png", sprite: "image/young pot_idle.png", sound: "image/open door.mp3" },
    { type: "textbox", text: "Player: Pot, what was that sound just now?", sprite: "image/young pot_idle.png" },
    { type: "textbox", text: "Pot: I was making a castle with my blocks…<br>One of them fell...", sprite: "image/young pot_nervous.png" },
    { type: "textbox", text: "Be careful next time, alright?", sprite: "image/young pot_nervous.png" },
    { type: "textbox", text: "Pot: Ok! I will", sprite: "image/young pot_idle.png" },

    //===PART 3===
    { type: "transition" },
    { type: "overlay", text: "Again, a muffled thump behind the door…", sound: "image/Crash_2.mp3" },
    { type: "transition" },
    { type: "NoText", bg: "image/door_young.png" },
    { type: "knock", bg: "image/door_young.png", sound: "image/knocking door.mp3", sound: "image/open door.mp3" },
    { type: "textbox", bg: "image/room_1.png", text: "I told you about these noises, Pot.<br>Are you trying to ignore me, on purpose?", sprite: "image/young pot_nervous.png" },
    { type: "textbox", text: "Pot: No! I wasn’t- I dropped a toy, I swear!", sprite: "image/young pot_nervous.png" },
    { type: "textbox", text: "Why do I always have to repeat myself?", sprite: "image/young pot_nervous.png" },
    { type: "textbox", text: "Pot: I didn’t mean to...", sprite: "image/young pot_cry.png" },
    { type: "textbox", text: "(sigh, god how I HATE it whenever it does that)", sprite: "image/young pot_cry.png" },
    { type: "textbox", text: "Just… clean it up. I’m tired of the mess.", sprite: "image/young pot_cry.png" },
    { type: "textbox", text: "Pot: *sniff*...O-okay...", sprite: "image/young pot_nervous.png" },

    //===PART 4===
    { type: "transition" },
    { type: "overlay", text: "I don’t know why it bothered me so much.<br> It was just a toy.<br>But the sound of it...", sound: "image/crying.mp3" },
    { type: "overlay", text: "It gets under my<br> S K I N.  " },
    { type: "transition" },
    { type: "NoText", bg: "image/door_young.png" },
    { type: "knock", bg: "image/door_young.png", sound: "image/banging on door.mp3" },
    { type: "textbox", text: "POT!!!<br> WHY THE HELL ARE YOU CRYING???" },
    { type: "textbox", bg: "image/room_1.png", text: "Pot: *whimpering*", sprite: "image/young pot_cry.png", sound: "image/open door.mp3" },
    { type: "textbox", text: "Didn't I ask you to stop making noise?  ", sprite: "image/young pot_cry.png" },
    { type: "textbox", text: "Pot: I’m sorry… I didn’t mean to be loud… I just feel sad… ", sprite: "image/young pot_cry.png" },
    { type: "textbox", text: "I told you before. Crying doesn’t solve anything. <br> So stop it, I'm losing god damn my patience with you.", sprite: "image/young pot_cry.png" },

    //===PART 5===
    { type: "transition" },
    { type: "overlay", text: "Another crash.<br> Louder this time...", sound: "image/crash_5.mp3" },
    { type: "transition" },
    { type: "textbox", bg: "image/room_1.png", text: "POT! <br> WHAT. DID, YOU, DO?", sprite: "image/young pot_cry.png" },
    { type: "textbox", text: "Pot: I-I didn’t mean to! I was trying to clean, and the cup slipped and- ", sprite: "image/young pot_cry.png" },
    { type: "slap", sound: "image/Slap.mp3", sprite: "image/young pot_slapped.png", text: "Look what you made me do." },
    { type: "textbox", bg: "image/room_1.png", text: "You were well behaved and obedient like I told you <br> this wouldn't happens! ", sprite: "image/young pot_slapped.png" },
    { type: "textbox", text: "Pot:.....*mumbles* I’m sorry.... ", sprite: "image/young pot_damaged.png" },

    //===PART 6===
    { type: "transition" },
    { type: "overlay", text: "Some years later" },
    { type: "textbox", text: "Hey, Pot? <br> Can you come out for a minute?  ", bg: "image/door_aged.png" },
    { type: "knock", bg: "image/door_aged.png", sound: "image/knocking door.mp3" },
    { type: "textbox", text: "..." },
    { type: "textbox", text: "I just need you to take the trash out. <br>It won’t take long." },
    { type: "textbox", text: "..." },
    { type: "textbox", text: "Pot?" },
    { type: "textbox", text: "..." },
    { type: "textbox", text: "Pot:  …I’m tired.<br>Can I do it later?" },
    { type: "textbox", text: "Tired, huh…?" },
    { type: "textbox", text: "You’ve been in there all day. <br> I just need this done now. " },
    { type: "textbox", text: "Pot: I just don’t want to right now.<br> I’ll do it later, I swear. " },
    { type: "textbox", text: "Look, I am asking you nicely." },
    { type: "textbox", text: "Now I’m not asking you twice." },
    { type: "textbox", bg: "image/room_2.png", sprite: "image/aged pot_idle.png" },
    { type: "textbox", text: "Pot:  I said I’ll do it later.<br> Just not right now.", sprite: "image/aged pot_idle.png" },
    { type: "textbox", text: "*Scoff* You don’t get to decide when.", sprite: "image/aged pot_idle.png" },
    { type: "textbox", text: "When I say do it, you do it straight away.", sprite: "image/aged pot_nervous.png" },
    { type: "textbox", text: "Pot: I’m tired… I just want a few minutes break", sprite: "image/aged pot_nervous.png" },
    { type: "textbox", text: " I’m tired too.<br> But I still get up and do what’s needed. ", sprite: "image/aged pot_nervous.png" },
    { type: "textbox", text: "Pot: This isn't fair...!", sprite: "image/aged pot_nervous.png" },
    { type: "struggle", text: "Don’t you dare talk back to me like that. YOU HEAR ME??", sprite: "image/aged pot_attacked.png" },
    { type: "struggle", text: "Pot: I'm sor-", sprite: "image/aged pot_attacked.png" },
    { type: "lastSlap", sound: "image/Slap.mp3" },



  ];

  showScene();
}

function nextScene() {
  currentScene++;
  if (currentScene < scenes.length) {
    showScene();
  }
}

function showScene() {
  let sc = scenes[currentScene];
  textbox.style.display = "none";
  textbox.style.opacity = 1;
  textboxText.innerHTML = "";
  overlay.innerText = "";
  overlay.style.opacity = 0;
  hint.style.display = "none";
  textboxArrow.style.display = "none";

  if (sc.type === "textbox") {
    if (sc.bg) {
      bg.src = sc.bg;
      bg.style.opacity = 1;
    }
    if (sc.sprite) {
      sprite.src = sc.sprite;
      sprite.style.opacity = 1;
    } else {
      sprite.style.opacity = 0;
    }

    textbox.style.display = "block";

    if (sc.sound) {
      let sfx = new Audio(sc.sound);
      sfx.play();
    }

    if (sc.text && sc.text.trim() !== "") {

      typeWriter(sc.text, textboxText, sc.typingSound);
    } else {
      typing = false;
      textboxArrow.style.display = "block";
    }


  } else if (sc.type === "overlay") {
    bg.style.opacity = 0;
    sprite.style.opacity = 0;
    overlay.style.opacity = 1;

    if (sc.sound) {

      if (currentOverlaySound) {
        currentOverlaySound.pause();
        currentOverlaySound.currentTime = 0;
      }
      currentOverlaySound = new Audio(sc.sound);
      currentOverlaySound.play();
    }


    if (sc.text && sc.text.trim() !== "") {
      typeWriter(sc.text, overlay);
    } else {
      hint.style.display = "block";
    }

  } else if (sc.type === "slap") {
    textbox.style.display = "block";
    if (sc.bg) {
      bg.src = sc.bg;
      bg.style.opacity = 1;
    }
    if (sc.sprite) {
      sprite.src = sc.sprite;
      sprite.style.opacity = 1;
    }


    bg.classList.add("shake");
    setTimeout(() => {
      bg.classList.remove("shake");
    }, 500);

  } else if (sc.type === "transition" || sc.type === "NoText" || sc.type === "slap") {

    if (currentOverlaySound) {
      currentOverlaySound.pause();
      currentOverlaySound.currentTime = 0;
      currentOverlaySound = null;
    }

    textbox.style.opacity = 0;
    bg.style.opacity = 0;
    sprite.style.opacity = 0;

    if (sc.type === "transition") {
      setTimeout(() => {
        textbox.style.display = "none";
        showNextAfterTransition();
      }, 2000);
    }

    if (sc.type === "NoText") {
      if (sc.bg) {
        bg.src = sc.bg;
        bg.style.opacity = 1;
      }
      sprite.style.opacity = 0;
      textbox.style.display = "none";
      hint.style.display = "block";
    }

    if (sc.sound) {
      let sfx = new Audio(sc.sound);
      sfx.play();
    }


    if (sc.text && sc.text.trim() !== "") {
      typeWriter(sc.text, textboxText);
    } else {
      textboxArrow.style.display = "block";
    }

  } else if (sc.type === "shakeTextbox") {
    if (sc.bg) {
      bg.src = sc.bg;
      bg.style.opacity = 1;
    }

    if (sc.sprite) {
      sprite.src = sc.sprite;
      sprite.style.opacity = 1;
      sprite.classList.add("shake-violent");
    }

    textbox.style.display = "block";

    if (sc.text && sc.text.trim() !== "") {
      typeWriter(sc.text, textboxText);
    } else {
      typing = false;
      textboxArrow.style.display = "block";
    }

    setTimeout(() => {
      sprite.classList.remove("shake-violent");
    }, 500);

  } else if (sc.type === "struggle") {
    if (sc.bg) {
      bg.src = sc.bg;
      bg.style.opacity = 1;
    }

    if (sc.sprite) {
      sprite.src = sc.sprite;
      sprite.style.opacity = 1;
    }

    textbox.style.display = "block";


    let shakeInterval = setInterval(() => {
      sprite.classList.add("shake-violent");
      setTimeout(() => {
        sprite.classList.remove("shake-violent");
      }, 500);
    }, 700);


    const stopShake = () => {
      clearInterval(shakeInterval);
      document.removeEventListener("keydown", stopShakeListener);
    };
    const stopShakeListener = (e) => {
      if (e.code === "Space") stopShake();
    };
    document.addEventListener("keydown", stopShakeListener);

    if (sc.text && sc.text.trim() !== "") {
      typeWriter(sc.text, textboxText);
    } else {
      typing = false;
      textboxArrow.style.display = "block";
    }
  } else if (sc.type === "lastSlap") {

    if (sc.sound) {
      let sfx = new Audio(sc.sound);
      sfx.play();
    }

    textbox.style.display = "none";
    textboxText.innerHTML = "";
    sprite.style.opacity = 0;
    bg.style.opacity = 0;
    overlay.style.opacity = 0;
    hint.style.display = "none";
    textboxArrow.style.display = "none";

  } else if (sc.type === "transition") {
    textbox.style.opacity = 0;
    bg.style.opacity = 0;
    sprite.style.opacity = 0;

    setTimeout(() => {
      textbox.style.display = "none";
      showNextAfterTransition();
    }, 2000);

  } else if (sc.type === "knock") {
    if (sc.bg) {
      bg.src = sc.bg;
      bg.style.opacity = 1;
    }
    sprite.style.opacity = 0;

    bg.classList.add("knock");
    setTimeout(() => {
      bg.classList.remove("knock");
    }, 1000)

    if (sc.sound) {
      let sfx = new Audio(sc.sound);
      sfx.play();
    }

    setTimeout(() => {
      bg.classList.remove("knock");
      hint.style.display = "block";
    }, 1000);

  } else if (sc.type === "NoText") {
    if (sc.bg) {
      bg.src = sc.bg;
      bg.style.opacity = 1;
    }
    sprite.style.opacity = 0;
    textbox.style.display = "none";
    hint.style.display = "block";
  }
}


function showNextAfterTransition() {
  currentScene++;
  if (currentScene < scenes.length) {
    showScene();
  }
}

function formatDialogue(text) {
  if (text.startsWith("Player:")) {
    return `<span class="player-text">${text}</span>`;
  } else if (text.startsWith("Pot:")) {
    return `<span class="pot-text">${text}</span>`;
  }
  return text;
}

let typingInterval;

function typeWriter(fullText, targetElem) {
  displayText = "";
  textIndex = 0;
  typing = true;

  hint.style.display = "none";
  textboxArrow.style.display = "none";

  if (typingInterval) clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    displayText += fullText[textIndex];
    targetElem.innerHTML = formatDialogue(displayText);
    textIndex++;

    if (textIndex >= fullText.length) {
      clearInterval(typingInterval);
      typing = false;

      let sc = scenes[currentScene];
      if (sc.type === "textbox") {
        textboxArrow.style.display = "block";
      } else {
        hint.style.display = "block";
      }
    }
  }, 40);
}

function finishText() {
  if (typingInterval) clearInterval(typingInterval);

  let sc = scenes[currentScene];
  let targetElem = sc.type === "textbox" ? textboxText : overlay;
  targetElem.innerHTML = formatDialogue(sc.text);
  typing = false;
}

startGame();

