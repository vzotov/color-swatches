<template>
  <div class="grid" :class="{
    'loading': loading
  }">
    <div class="swatch-container" v-for="swatch in swatches" :key="swatch.h">
      <Swatch :swatch="swatch" />
    </div>
  </div>
</template>
<script setup>
import Swatch from '@/Swatch.vue';

defineProps({
  'swatches': {
    type: Array,
    default: () => []
  },
  'loading': Boolean
});
</script>
<style scoped>
.grid {
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
}
.loading {
  opacity: 0.5;
}
</style>
