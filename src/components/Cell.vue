<template>
  <div
    :class="{ cell: true, revealed: cellData.revealed }"
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
  border: 1px solid #c0c0c0;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  background-color: rgb(128 126 126);
  display: flex;
  align-items: center;
  justify-content: center;
}

.revealed {
  background-color: #604848;
}
</style>
