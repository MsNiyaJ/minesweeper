<template>
  <div id="board-container">
    <button id="flag-btn" :class="flagClass" @click="toggleFlag">
      <img src="../assets/red-flag.png" />
    </button>
    <div id="board">
      <div id="board-row" v-for="row in board.boardCells">
        <Cell
          v-for="value in row"
          :value="value"
          :onFlagMode="flagMode"
          @emptyCellClicked="board.revealEmptyCells()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Board } from '../board';
import Cell from './Cell.vue';

const board = ref(new Board());
const flagClass = ref('flag-off');
const flagMode = ref(false);

function toggleFlag() {
  flagMode.value = !flagMode.value;
  flagClass.value = flagMode.value ? 'flag-on' : 'flag-off';
}
</script>

<style scoped>
#board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#board-row {
  display: flex;
}

#flag-btn {
  cursor: pointer;
  margin-bottom: 10px;
}

#flag-btn img {
  width: 20px;
  height: 20px;
}

#flag-btn.flag-on {
  background-color: #8b8b8b;
}

#flag-btn.flag-off {
  background-color: #dfdfdf;
}
</style>
