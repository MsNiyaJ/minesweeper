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
    <div
      v-if="cellData.value === 'B' && cellData.revealed"
      class="bombCellWrapper"
    >
      <img :src="bombIconSrc" />
    </div>
    <img
      v-else-if="cellData.hasFlag"
      class="red-flag"
      src="../assets/red-flag.png"
    />
    <span v-else-if="cellData.revealed">{{ cellData.value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ICellData } from '../board';

const props = defineProps<{ cellData: ICellData; onFlagMode: boolean }>();
const emit = defineEmits(['gameOver', 'revealCells', 'toggleFlag']);

const bombIconSrc = computed(() => {
  // Blast icon created by Ylivdesign - Flaticon
  const img = props.cellData.exploded ? 'blast' : 'bomb';
  return `src/assets/${img}.png`;
});

function handleClick() {
  const { cellData, onFlagMode } = props;

  if (cellData.revealed || cellData.disabled) return;

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

.bombCellWrapper {
  width: 100%;
  height: 100%;
}

.bombCellWrapper img {
  width: 1.2rem;
  height: 1.2rem;
}

.pushedIn {
  border-top: 1px solid #303030;
  border-left: 1px solid #303030;
  border-right: 1px solid #535252;
  border-bottom: 1px solid #5a5a5a;
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
