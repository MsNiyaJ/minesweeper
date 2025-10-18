<template>
  <div
    :class="{
      cell: true,
      revealed: cellData.revealed,
      popOut: !cellData.revealed,
      pushedIn: cellData.revealed,
    }"
    @click="handleClick"
  >
    <img
      v-show="cellData.hasFlag"
      class="red-flag"
      src="../assets/red-flag.png"
    />
    <span v-show="cellData.revealed">{{ cellData.value }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ICellData } from '../board';

const props = defineProps<{ cellData: ICellData; onFlagMode: boolean }>();
const emit = defineEmits(['gameOver', 'revealCells', 'toggleFlag']);

function handleClick() {
  const { cellData, onFlagMode } = props;

  if (cellData.revealed) return;

  if (onFlagMode) {
    emit('toggleFlag');
    return;
  }

  if (cellData.hasFlag) return;

  const bombClicked = cellData.value === 'B';
  emit(bombClicked ? 'gameOver' : 'revealCells');
}
</script>

<style scoped>
.red-flag {
  width: 20px;
  height: 20px;
}

.cell {
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  background-color: rgb(128 126 126);
  display: flex;
  align-items: center;
  justify-content: center;
}

.revealed {
  background-color: #5e5e5e;
}

.pushedIn {
  border-top: 1px solid #303030;
  border-left: 1px solid #303030;
  border-right: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.popOut {
  border-top: 1px solid #a0a0a0;
  border-left: 1px solid #a0a0a0;
  border-right: 1px solid #303030;
  border-bottom: 1px solid #303030;
  box-shadow: inset 1px 1px 0px #a0a0a0, inset -1px -1px 0px #303030;
  transition: all 0.1s ease;
}
</style>
