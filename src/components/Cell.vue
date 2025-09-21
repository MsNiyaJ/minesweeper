<template>
  <div class="cell" @click="handleClick">
    <img v-show="flagShown" class="red-flag" src="../assets/red-flag.png" />
    <span v-show="valueShown">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ value: string; onFlagMode: boolean }>();
const emit = defineEmits(['emptyCellClicked']);

const valueShown = ref(false);
const flagShown = ref(false);

function handleClick() {
  const { value, onFlagMode } = props;
  const bombClicked = value === 'B';
  const blewupBomb = bombClicked && !onFlagMode && !flagShown.value;
  const emptyCellClicked = value === '';

  if (blewupBomb) {
    alert('Game Over!');
  } else if (emptyCellClicked) {
    emit('emptyCellClicked');
  } else if (onFlagMode && !valueShown.value) {
    flagShown.value = !flagShown.value;
  } else if (!flagShown.value) {
    valueShown.value = true;
  }
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
  border: 1px solid #ccc;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  background-color: #8b8b8b;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
