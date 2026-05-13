"use strict";

window.addEventListener("c4:stoneInserted", (e) => {
    console.log(`Stein gesetzt bei Zeile ${e.detail.row}, Spalte ${e.detail.col} von Spieler ${e.detail.player}`);
});

window.addEventListener("c4:gameOver", (e) => {
    console.log("GAME OVER:", e.detail.type === "win" ? "Gewinner ist Spieler " + e.detail.winner : "Unentschieden!");
});