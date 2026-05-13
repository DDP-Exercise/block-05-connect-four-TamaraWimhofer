"use strict";

const MODEL = {
    ROWS: 5,
    COLS: 6,
    PLAYER_ONE: 1,
    PLAYER_TWO: 2,

    board: [],
    currentPlayer: 1,
    gameOver: false,
    winningStones: [],

    init() {
        this.board = Array(this.ROWS).fill(null).map(() => Array(this.COLS).fill(0));
        this.currentPlayer = this.PLAYER_ONE;
        this.gameOver = false;
        this.winningStones = [];
    },

    insertStone(col) {
        if (this.gameOver) return;

        for (let r = this.ROWS - 1; r >= 0; r--) {
            if (this.board[r][col] === 0) {
                this.board[r][col] = this.currentPlayer;
                this.dispatchStoneInserted(r, col);

                if (this.checkWin(r, col)) {
                    this.gameOver = true;
                    this.dispatchGameOver("win");
                } else if (this.isDraw()) {
                    this.gameOver = true;
                    this.dispatchGameOver("draw");
                } else {
                    this.changePlayer();
                }
                return;
            }
        }
    },

    changePlayer() {
        this.currentPlayer = (this.currentPlayer === this.PLAYER_ONE) ? this.PLAYER_TWO : this.PLAYER_ONE;
        this.dispatchPlayerChanged();
    },

    checkWin(r, c) {
        const DIRECTIONS = [[0, 1], [1, 0], [1, 1], [1, -1]];
        const PLAYER = this.board[r][c];

        for (let [dr, dc] of DIRECTIONS) {
            let stones = [[r, c]];
            [1, -1].forEach(dir => {
                let i = 1;
                while (true) {
                    let nr = r + dr * i * dir, nc = c + dc * i * dir;
                    if (this.board[nr] && this.board[nr][nc] === PLAYER) {
                        stones.push([nr, nc]);
                        i++;
                    } else break;
                }
            });

            if (stones.length >= 4) {
                this.winningStones = stones;
                return true;
            }
        }
        return false;
    },

    isDraw() {
        return this.board[0].every(cell => cell !== 0);
    },

    dispatchPlayerChanged() {
        window.dispatchEvent(new CustomEvent("c4:playerChanged", { detail: { player: this.currentPlayer } }));
    },
    dispatchStoneInserted(row, col) {
        window.dispatchEvent(new CustomEvent("c4:stoneInserted", { detail: { row, col, player: this.currentPlayer } }));
    },
    dispatchGameOver(type) {
        window.dispatchEvent(new CustomEvent("c4:gameOver", {
            detail: { type, winner: this.currentPlayer, stones: this.winningStones }
        }));
    }
};