// ==========================================
// APP LOGIC & CORE ENGINE
// ==========================================

const VALID_USER = "Gangan";
const VALID_PASS = "Gangan@999";

function authenticateUser() {
    const u = document.getElementById('usernameInput').value;
    const p = document.getElementById('passwordInput').value;
    const key = document.getElementById('apiKeyInput').value;

    if (u === VALID_USER && p === VALID_PASS) {
        if (key) {
            saveApiKey(key);
        }
        document.getElementById('loginOverlay').style.display = 'none';
        speak("Identity verified. Welcome back, Gangan.");
        log("[AUTHENTICATED]: User Gangan logged in successfully.");
    } else {
        document.getElementById('loginError').style.display = 'block';
        triggerError();
    }
}

// DRAWER TOGGLE
function toggleDrawer() {
    document.getElementById('drawer').classList.toggle('open');
}

// THEME SWITCHER
function setMode(mode) {
    if (mode === 'normal') {
        document.documentElement.style.setProperty('--core-color', '#ffd700');
        document.documentElement.style.setProperty('--glow-color', 'rgba(255, 215, 0, 0.6)');
        log("[SYSTEM]: Normal Mode active (Yellow Core).");
        speak("Normal Mode active, Gangan.");
    } else if (mode === 'study') {
        document.documentElement.style.setProperty('--core-color', '#00ff66');
        document.documentElement.style.setProperty('--glow-color', 'rgba(0, 255, 102, 0.6)');
        log("[SYSTEM]: Study Mode active (Green Core).");
        speak("Study Mode enabled. Focus protocol online.");
    } else if (mode === 'sports') {
        document.documentElement.style.setProperty('--core-color', '#00d9ff');
        document.documentElement.style.setProperty('--glow-color', 'rgba(0, 217, 255, 0.6)');
        log("[SYSTEM]: Sports Mode active (Blue Core).");
        speak("Sports Mode ready. Telemetry tracking live.");
    } else if (mode === 'orange') {
        document.documentElement.style.setProperty('--core-color', '#ff6600');
        document.documentElement.style.setProperty('--glow-color', 'rgba(255, 102, 0, 0.6)');
        log("[SYSTEM]: Orange Protocol active.");
        speak("Orange protocol engaged.");
    } else if (mode === 'purple') {
        document.documentElement.style.setProperty('--core-color', '#8022ff');
        document.documentElement.style.setProperty('--glow-color', 'rgba(128, 34, 255, 0.6)');
        log("[SYSTEM]: Purple Matrix active.");
        speak("Purple matrix online.");
    }
    toggleDrawer();
}

function triggerError() {
    document.documentElement.style.setProperty('--core-color', '#ff0044');
    document.documentElement.style.setProperty('--glow-color', 'rgba(255, 0, 68, 0.6)');
    log("[ERROR]: Core integrity failure! State set to Red.");
    speak("Warning! Error detected in core reactor.");
}

function log(msg) {
    const box = document.getElementById('console');
    box.innerHTML += `<br>> ${msg}`;
    box.scrollTop = box.scrollHeight;
}

// TEXT TO SPEECH
function speak(text) {
    const sysSpeech = window.speechSynthesis;
    sysSpeech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1;
    utterance.rate = 1.0;
    sysSpeech.speak(utterance);
}

// SPEECH RECOGNITION & GROQ AI
function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        triggerError();
        log("Speech Recognition unavailable on this browser.");
        return;
    }
    const recognition = new SpeechRecognition();
    log("Listening...");
    recognition.start();

    recognition.onresult = async (e) => {
        const query = e.results[0][0].transcript;
        log(`Gangan: ${query}`);
        await callGroqAI(query);
    };

    recognition.onerror = () => triggerError();
}

async function callGroqAI(promptText) {
    const apiKey = getStoredApiKey();
    if (!apiKey) {
        log("[SYSTEM]: No API key detected. Please log in with your API key.");
        speak("Boss, please enter your API key during login.");
        return;
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "You are Spydern.ai, a cheerful, witty, and loyal holographic spider assistant to Gangan. Keep answers concise." },
                    { role: "user", content: promptText }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        log(`Spydern.ai: ${reply}`);
        speak(reply);
    } catch (err) {
        triggerError();
        log("[API ERROR]: Connection to Groq network failed.");
    }
}

// FILE CONVERTER
function convertTextFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const content = evt.target.result;
        const converted = JSON.stringify({ filename: file.name, textData: content });
        
        const blob = new Blob([converted], { type: "application/json" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${file.name}.json`;
        link.click();
        
        log(`File converted: ${file.name} -> JSON`);
        speak("File format conversion complete.");
    };
    reader.readAsText(file);
}

// IMAGE READER
function readImageFile(e) {
    const file = e.target.files[0];
    if (file) {
        log(`Analyzing visual buffer: ${file.name}`);
        speak("Visual analysis loaded into memory.");
    }
}

function simulateMediaProd() {
    speak("Production pipeline ready for video and image tasks.");
    log("[STUDIO]: Prompt registered in media queue.");
}

// GAME ENGINE
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let spydernY = 200;
let score = 0;
let cars = [{ x: 0, y: 130, speed: 3 }, { x: 140, y: 70, speed: -4 }];

function toggleGame() {
    const g = document.getElementById('gameSection');
    g.style.display = g.style.display === 'flex' ? 'none' : 'flex';
    if (g.style.display === 'flex') gameLoop();
}

canvas.addEventListener('click', () => {
    spydernY -= 20;
    score += 10;
    if (spydernY < 20) {
        spydernY = 200;
        log(`Round cleared! Score: ${score}`);
        speak("Level cleared! Nice moves, Gangan!");
    }
});

function gameLoop() {
    if (document.getElementById('gameSection').style.display !== 'flex') return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#180a30';
    ctx.fillRect(0, 50, 280, 120);

    ctx.font = "22px Arial";
    ctx.fillText("🕷️", 130, spydernY);

    ctx.fillStyle = '#ff0055';
    cars.forEach(c => {
        c.x += c.speed;
        if (c.x > 280) c.x = -30;
        if (c.x < -30) c.x = 280;
        ctx.fillRect(c.x, c.y, 30, 18);

        if (Math.abs(c.x - 130) < 20 && Math.abs(c.y - spydernY) < 15) {
            triggerError();
            log("Crossy Spydern crashed! Resetting...");
            spydernY = 200;
        }
    });

    requestAnimationFrame(gameLoop);
}

// SERVICE WORKER REGISTER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
