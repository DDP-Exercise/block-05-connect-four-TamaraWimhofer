"use strict";

const CONTROLLER = {
    IS_INITIALIZED: false,

    init() {
        MODEL.init();

        VIEW.init();

        if (!this.IS_INITIALIZED) {
            this.setupEventListeners();
            this.IS_INITIALIZED = true;
        }

        console.log("Spiel wurde initialisiert.");
    },

    setupEventListeners() {
        const BOARD_EL = document.getElementById("board");

        if (BOARD_EL) {
            BOARD_EL.addEventListener("click", (e) => {
                const CELL = e.target.closest(".cell");

                if (CELL) {
                    const COL = parseInt(CELL.dataset.col);

                    MODEL.insertStone(COL);
                }
            });
        }
    }
};

window.onload = () => {
    CONTROLLER.init();
};