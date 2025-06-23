const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");

const app = express();
const server = http.createServer(app);
const io = socket(server);

// Initialize Chess game state
const chess = new Chess();
let players = {}; // Tracks connected players

// Server settings
app.set("view engine", "ejs");
app.use(express.static("public"));

// Route: Render main game page
app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

// Handle new socket connections
io.on("connection", (socket) => {
  console.log(`🟢 New connection: ${socket.id}`);

  assignPlayerRole(socket);
  sendInitialBoardState(socket);
  handlePlayerDisconnect(socket);
  handleMove(socket);
  handleGameControls(socket);
});

// Assign player roles (White, Black, or Spectator)
function assignPlayerRole(socket) {
  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
    console.log(`⚪ Player ${socket.id} assigned as White`);
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
    console.log(`⚫ Player ${socket.id} assigned as Black`);
  } else {
    socket.emit("spectator");
    console.log(`👀 Player ${socket.id} assigned as Spectator`);
  }
}

// Send current board state
function sendInitialBoardState(socket) {
  socket.emit("boardState", chess.fen());
}

// Handle player disconnection
function handlePlayerDisconnect(socket) {
  socket.on("disconnect", () => {
    console.log(`🔴 Disconnected: ${socket.id}`);

    if (players.white === socket.id) {
      delete players.white;
      console.log("⚪ White player left.");
    }
    if (players.black === socket.id) {
      delete players.black;
      console.log("⚫ Black player left.");
    }
  });
}

// Handle moves
function handleMove(socket) {
  socket.on("move", (move) => {
    console.log(`🎯 Move from ${socket.id}:`, move);

    if (!isValidPlayerMove(socket.id)) {
      console.log(`❌ Invalid player turn. Expected: ${chess.turn()}`);
      return;
    }

    try {
      const moveResult = chess.move(move); // e.g., {color, from, to, flags...}
      if (moveResult) {
        console.log("✅ Move valid:", moveResult);
        io.emit("move", moveResult); // Send actual move result
        io.emit("boardState", chess.fen()); // Sync board state
      } else {
        console.log("❗ Move rejected by chess.js");
        socket.emit("Invalid move", move);
      }
    } catch (err) {
      console.error("💥 Error processing move:", err);
      socket.emit("Invalid move", move);
    }
  });
}

// Validate turn
function isValidPlayerMove(playerId) {
  return (
    (chess.turn() === "w" && players.white === playerId) ||
    (chess.turn() === "b" && players.black === playerId)
  );
}

// Game controls: restart, draw, resign
function handleGameControls(socket) {
  // Restart game
  socket.on("restartGame", () => {
    chess.reset();
    io.emit("boardState", chess.fen());
    io.emit("restartGame");
    console.log("🔄 Game restarted.");
  });

  // Offer draw
  socket.on("offerDraw", () => {
    socket.broadcast.emit("offerDraw");
    console.log("🤝 Draw offer sent.");
  });

  socket.on("drawAccepted", () => {
    chess.reset();
    io.emit("boardState", chess.fen());
    io.emit("restartGame");
    console.log("✅ Draw accepted, board reset.");
  });

  socket.on("drawRejected", () => {
    socket.broadcast.emit("drawRejected");
    console.log("❌ Draw rejected.");
  });

  // Resign
  socket.on("playerResigned", () => {
    socket.broadcast.emit("playerResigned");
    chess.reset();
    io.emit("boardState", chess.fen());
    console.log("🏳️ A player resigned. Game reset.");
  });
}

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
