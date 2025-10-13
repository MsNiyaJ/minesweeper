<template>
  <div id="board-container">
    <div id="toolbar">
      <div id="bomb-count">
        <p>{{ board.remainingBombs }}</p>
        <!-- bomb icon created by Freepik - Flaticon -->
        <img src="../assets/bomb.png" />
      </div>
      <button
        id="flag-btn"
        :class="{ enabled: onFlagMode }"
        @click="toggleFlagMode"
      >
        <!-- red flag icon created by Fajrul Fitrianto - Flaticon  -->
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
</style>
