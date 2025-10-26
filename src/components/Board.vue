<template>
  <div id="board-container">
    <Toolbar
      :remainingBombs="board.remainingBombs"
      :gameOver="gameOver"
      :onFlagMode="onFlagMode"
      :emoteSrc="emoteSrc"
      @onNewGame="startNewGame"
      @toggleFlagMode="toggleFlagMode"
    />
    <div id="board">
      <div class="board-row" v-for="(row, rowIndex) in board.boardCells">
        <Cell
          v-for="(cellData, colIndex) in row"
          :cellData="cellData"
          :onFlagMode="onFlagMode"
          @toggleFlag="toggleFlag(cellData)"
          @revealCells="revealCells(rowIndex, colIndex)"
          @bombClicked="loseGame(cellData)"
          @mousedown="setEmoteSrc('worried')"
          @mouseup="setEmoteSrc('smile')"
        />
      </div>
      <div v-show="lostGame" class="game-over-message">
        <img src="../assets/blast.png" />
        <h1>GAME OVER!</h1>
      </div>
      <div v-show="wonGame" class="game-over-message">
        <h1>YOU WON!</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Board, type ICellData } from '../board';
import Toolbar from './Toolbar.vue';
import Cell from './Cell.vue';

const lostGame = ref(false);
const wonGame = ref(false);
const board = reactive(new Board());
const onFlagMode = ref(false);

const emotePath = 'src/assets/emote-';
const emoteSrc = ref(emotePath + 'smile.png');

const gameOver = computed(() => {
  return lostGame.value || wonGame.value;
});

function setEmoteSrc(emote: string) {
  emoteSrc.value = `${emotePath + emote}.png`;
}

function toggleFlagMode() {
  onFlagMode.value = !onFlagMode.value;
}

function toggleFlag(cell: ICellData) {
  cell.hasFlag ? board.flagRemoved(cell) : board.flagAdded(cell);
}

function revealCells(rowIndex: number, colIndex: number) {
  board.revealCells(rowIndex, colIndex);
  const won = board.checkForWin();
  if (won) {
    setEmoteSrc('shades');
    wonGame.value = true;
  }
}

function loseGame(cellData: ICellData) {
  setEmoteSrc('dead');
  board.setCellExploded(cellData);
  board.revealRemainingBombs();
  lostGame.value = true;
}

function startNewGame() {
  setEmoteSrc('smile');
  lostGame.value = false;
  wonGame.value = false;
  onFlagMode.value = false;
  board.totalFlags = 0;
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

.game-over-message {
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

.game-over-message img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.game-over-message h1 {
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
