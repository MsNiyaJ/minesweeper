<template>
  <div id="board-container">
    <div id="toolbar">
      <div id="bomb-count">
        <p>{{ board.remainingBombs }}</p>
        <!-- bomb icon created by Freepik - Flaticon -->
        <img src="../assets/bomb.png" />
      </div>
      <button id="new-game-btn" @click="startNewGame">
        <img :src="emoteSrc" />
      </button>
      <button
        id="flag-btn"
        :disabled="gameOver"
        :class="{ enabled: onFlagMode }"
        @click="toggleFlagMode"
      >
        <!-- red flag icon created by Fajrul Fitrianto - Flaticon  -->
        <img src="../assets/red-flag.png" />
      </button>
    </div>
    <div id="board">
      <div class="board-row" v-for="(row, rowIndex) in board.boardCells">
        <Cell
          v-for="(cellData, colIndex) in row"
          :cellData="cellData"
          :onFlagMode="onFlagMode"
          @toggleFlag="toggleFlag(cellData)"
          @revealCells="board.revealCells(rowIndex, colIndex)"
          @gameOver="endGame(cellData)"
          @mousedown="setEmoteSrc('worried')"
          @mouseup="setEmoteSrc('smile')"
        />
      </div>
      <div v-show="gameOver" id="game-over-explosion">
        <img src="../assets/blast.png" />
        <h1>GAME OVER!</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Board, type ICellData } from '../board';
import Cell from './Cell.vue';

const gameOver = ref(false);
const board = reactive(new Board());
const onFlagMode = ref(false);

const emotePath = 'src/assets/emote-';
const emoteSrc = ref(emotePath + 'smile.png');

function setEmoteSrc(emote: string) {
  emoteSrc.value = `${emotePath + emote}.png`;
}

function toggleFlagMode() {
  onFlagMode.value = !onFlagMode.value;
}

function toggleFlag(cell: ICellData) {
  cell.hasFlag ? board.flagRemoved(cell) : board.flagAdded(cell);
}

function endGame(cellData: ICellData) {
  gameOver.value = true;
  setEmoteSrc('dead');
  board.setCellExploded(cellData);
  board.revealRemainingBombs();
}

function startNewGame() {
  setEmoteSrc('smile');
  gameOver.value = false;
  board.generateBoard();
}
</script>

<style scoped>
#board {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px outset black;
}

.board-row {
  display: flex;
}

#toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  height: 2rem;
}

#flag-btn {
  cursor: pointer;
  background: rgb(159 158 158);
  height: 100%;
  width: 2.5rem;
  filter: grayscale(1);
}

#flag-btn img {
  height: 100%;
  width: 100%;
}

#flag-btn.enabled {
  filter: grayscale(0);
}

#bomb-count {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: rgb(159 158 158);
  height: 100%;
  padding: 0 10px;
  color: black;
  border: 3px outset black;
}

#bomb-count img {
  height: 1.5rem;
  width: 1.5rem;
}

#game-over-explosion {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: explosionGrow 3s ease-out forwards;
}

@keyframes explosionGrow {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  12.5% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  75% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

#game-over-explosion img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#game-over-explosion h1 {
  position: relative;
  font-weight: bold;
  text-shadow: 2px 2px 4px black;
  margin: 0;
  font-size: 1.5rem;
}

#new-game-btn {
  cursor: pointer;
  background: rgb(159 158 158);
  height: 100%;
  width: 3rem;
}

#new-game-btn img {
  height: 100%;
}
</style>
