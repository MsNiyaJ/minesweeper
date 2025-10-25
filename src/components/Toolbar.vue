<template>
  <div id="toolbar">
    <div id="bomb-count">
      <p>{{ props.remainingBombs }}</p>
      <!-- bomb icon created by Freepik - Flaticon -->
      <img src="../assets/bomb.png" />
    </div>
    <button id="new-game-btn" @click="startNewGame">
      <img :src="emoteSrc" />
    </button>
    <button
      id="flag-btn"
      :disabled="props.gameOver"
      :class="{ enabled: props.onFlagMode }"
      @click="toggleFlagMode"
    >
      <!-- red flag icon created by Fajrul Fitrianto - Flaticon  -->
      <img src="../assets/red-flag.png" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  remainingBombs: number;
  gameOver: boolean;
  onFlagMode: boolean;
  emoteSrc: string;
}>();

const emit = defineEmits(['onNewGame', 'toggleFlagMode']);

function startNewGame() {
  emit('onNewGame');
}

function toggleFlagMode() {
  emit('toggleFlagMode');
}
</script>

<style scoped>
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
