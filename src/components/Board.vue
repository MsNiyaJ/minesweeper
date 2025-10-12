<template>
  <div id="board-container">
    <div id="toolbar">
      <div id="bomb-count">
        <!-- Bomb icon created by Freepik - Flaticon -->
        <span>{{ board.remainingBombs }} <img src="../assets/bomb.png" /></span>
      </div>
      <button
        id="flag-btn"
        :class="{ enabled: onFlagMode }"
        @click="toggleFlagMode"
      >
        <img src="../assets/red-flag.png" />
      </button>
    </div>
    <div id="board">
      <div class="board-row" v-for="(row, rowIndex) in cells">
        <Cell
          v-for="(cellData, colIndex) in row"
          :cellData="cellData"
          :onFlagMode="onFlagMode"
          @toggleFlag="toggleFlag(cellData)"
          @revealCells="board.revealCells(rowIndex, colIndex)"
          @gameOver="endGame"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Board, type ICellData } from '../board';
import Cell from './Cell.vue';

const board = reactive(new Board());
const cells = reactive(board.boardCells);
const onFlagMode = ref(false);

function toggleFlagMode() {
  onFlagMode.value = !onFlagMode.value;
}

function toggleFlag(cell: ICellData) {
  cell.hasFlag ? board.flagRemoved(cell) : board.flagAdded(cell);
}

function endGame() {
  alert('Game Over!');
}
</script>

<style scoped>
#board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.board-row {
  display: flex;
}

#toolbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
}

#flag-btn {
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #dfdfdf;
}

#flag-btn img {
  width: 20px;
  height: 20px;
}

#flag-btn.enabled {
  background-color: #8b8b8b;
}

#bomb-count {
  background: rgb(129, 127, 127);
  padding: 0.5rem;
}

#bomb-count img {
  width: 1rem;
  height: 1rem;
}
</style>
