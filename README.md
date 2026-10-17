# Spydern.ai 🕷️

Your personal sci-fi holographic AI assistant web application built for Gangan.

## File Structure
1. `index.html` - Main UI structure.
2. `style.css` - Styling, color themes (Yellow, Green, Blue, Orange, Purple, Red).
3. `app.js` - Core functionalities, voice features, text-to-speech, and minigame.
4. `config.js` - Secure local storage handler for API keys.
5. `sw.js` - Service worker for offline functionality and PWA installation.

## How to Run Locally
1. Download all 5 files into the same folder on your computer.
2. Open `index.html` in any modern web browser.
3. Log in using username: **Gangan**, password: **Gangan@999**, and paste your **Groq API key** directly into the login prompt.

## Safe GitHub Upload
Because `config.js` uses browser local storage for your API key, your API key **will not** be written into your code files. You can safely push all files to public GitHub repositories without risking key theft!
