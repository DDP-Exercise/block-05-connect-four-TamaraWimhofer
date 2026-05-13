"use strict";

const VIEW = {
    IS_LISTENING: false,

    init() {
        const BOARD_EL = document.getElementById("board");
        if (!BOARD_EL) return;

        BOARD_EL.innerHTML = "";

        for (let r = 0; r < MODEL.ROWS; r++) {
            for (let c = 0; c < MODEL.COLS; c++) {
                const CELL = document.createElement("div");
                CELL.classList.add("cell");

                CELL.dataset.row = r;
                CELL.dataset.col = c;

                BOARD_EL.appendChild(CELL);
            }
        }

        this.showCurrentPlayer(MODEL.PLAYER_ONE);

        if (!this.IS_LISTENING) {
            this.setupListeners();
            this.IS_LISTENING = true;
        }
    },

    setupListeners() {
        window.addEventListener("c4:stoneInserted", (e) => this.updateField(e.detail));
        window.addEventListener("c4:playerChanged", (e) => this.showCurrentPlayer(e.detail.player));
        window.addEventListener("c4:gameOver", (e) => this.notifyGameOver(e.detail));
    },

    updateField(data) {
        const TARGET_CELL = document.querySelector(`.cell[data-row='${data.row}'][data-col='${data.col}']`);
        if (TARGET_CELL) {
            TARGET_CELL.classList.add(data.player === MODEL.PLAYER_ONE ? "mario" : "bowser");
        }
    },

    showCurrentPlayer(player) {
        const WRAPPER = document.getElementById("turn-wrapper");
        const INFO = document.getElementById("info-text");

        if (WRAPPER) {
            WRAPPER.classList.remove("mario-turn", "bowser-turn");

            if (player === MODEL.PLAYER_ONE) {
                WRAPPER.classList.add("mario-turn");
            } else {
                WRAPPER.classList.add("bowser-turn");
            }
        }

        if (INFO) {
            INFO.innerText = (player === MODEL.PLAYER_ONE)
                ? "Die Super Mario Bros sind am Zug!"
                : "Der Bowserclan greift an!";
        }
    },


    notifyGameOver(detail) {
        const INFO = document.getElementById("info-text");

        if (detail.type === "win") {
            const WINNER_NAME = (detail.winner === MODEL.PLAYER_ONE ? "Die Super Mario Bros" : "Bowser und Bowser Junior");
            if (INFO) INFO.innerText = `${WINNER_NAME} GEWINNEN!`;

            detail.stones.forEach(([r, c]) => {
                const WIN_CELL = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
                if (WIN_CELL) WIN_CELL.classList.add("winner");
            });
        } else {
            if (INFO) INFO.innerText = "UNENTSCHIEDEN!";
        }
    }
};