# ♟️ Real-Time Multiplayer Chess Game

A real-time, multiplayer chess game built with **Node.js**, **Socket.IO**, and **Chess.js**. This project enables players to play chess online against each other in real time, featuring elegant UI, move validation, game controls like restart, draw, and resign, and dynamic board updates.

---

## 🚀 Features

- ♞ Real-time gameplay with Socket.IO
- ♜ Player roles: White, Black, and Spectator
- ♟ Move validation via `chess.js`
- 🔁 Restart game with confirmation
- 🤝 Draw offer and acceptance flow
- 🏳️ Resignation handling
- ♛ Pawn promotion UI
- 🌐 Spectator mode for extra connections
- 🎨 Beautiful UI with Tailwind CSS
- 📦 Fully modular, clean code structure

---

## 🧩 Tech Stack

| Technology   | Purpose                        |
|--------------|--------------------------------|
| Node.js      | Backend runtime                |
| Express.js   | Web framework                  |
| Socket.IO    | Real-time WebSocket handling   |
| Chess.js     | Chess rules and move validation |
| EJS          | HTML Templating engine         |
| Tailwind CSS | Responsive and modern styling  |

---

## 🛠️ Project Structure

📦 chess-game/
- public/
- js/
- chess.js # Frontend logic
- views/
- index.ejs # Main game page
- index.js # Server entry point
- package.json # Project metadata and dependencies

---

## 🔧 Installation & Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/Krutarth-2004/Chess.git
cd Chess
```
2. **Install dependencies**
  ```bash
  npm install
  ```
3. **Run the server**
  ```bash
  npm start
  ```
4. **Open in browser**
  ```bash
  http://localhost:5000
  ```
---

## 🌐 How It Works
The server assigns players as White or Black.

Additional players become Spectators.

Moves are validated server-side using chess.js.

Board state is synchronized in real time via Socket.IO.

Players can offer a draw, resign, or restart the game.

---

## 🧠 Future Improvements
User authentication

Match history or leaderboard

Chat support

Invite-based private rooms

Timed games (countdown per move)

---

## 🙌 Credits
Inspired by real-time chess tutorials and customized for a clean, interactive multiplayer experience.

---

## 🙋‍♂️ Author
Krutarth Kadia
- 📧 krutarthkadia@gmail.com
- 🐙 GitHub: @Krutarth-2004
- 🔗 LinkedIn: https://www.linkedin.com/in/krutarth-kadia-76652931a/

---

## ⭐️ If you like this project...
Please consider giving it a ⭐ on GitHub! It helps others discover it 🙌
