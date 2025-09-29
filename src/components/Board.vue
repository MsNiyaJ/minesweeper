<template>
  <div id="board-container">
    <button
      id="flag-btn"
      :class="{ enabled: onFlagMode }"
      @click="toggleFlagMode"
    >
      <img src="../assets/red-flag.png" />
    </button>
    <div id="board">
      <div class="board-row" v-for="(row, rowIndex) in cells">
        <Cell
          v-for="(cellData, colIndex) in row"
          :cellData="cellData"
          :onFlagMode="onFlagMode"
          @revealCells="board.revealCells(rowIndex, colIndex)"
          @gameOver="endGame"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Board } from '../board';
import Cell from './Cell.vue';

const board = reactive(new Board());
const cells = reactive(board.boardCells);
const onFlagMode = ref(false);

function toggleFlagMode() {
  onFlagMode.value = !onFlagMode.value;
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
</style>
