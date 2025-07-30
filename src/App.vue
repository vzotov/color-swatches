<template>
  <div class="app">
    <h1>HSL Color Swatches</h1>
    <div class="controls">
      <Slider
        label="Saturation"
        v-model="s"
        :min="0"
        :max="100"
      />
      <Slider
        label="Lightness"
        v-model="l"
        :min="0"
        :max="100"
      />
    </div>
    <SwatchGrid :swatches="swatches" :loading="loading" />
  </div>
</template>

<script setup lang="js">
import SwatchGrid from "@/SwatchGrid.vue";
import { ref, watch } from 'vue';
import { getColorSwatchesOptimized } from '@/composables/useColorAPI.js';
import { useDebounceFn } from '@vueuse/core';
import precached from '@/data/precache.json';
import Slider from '@/Slider.vue';

const s = ref(100);
const l = ref(50);
const loading = ref(false);
// Initialize swatches with precached data for faster initial load with s=100, l=50
const swatches = ref(precached);
let currentAbort = null;

// Debouncing fetch to avoid excessive API calls
const fetchSwatches = useDebounceFn(async (s, l) => {
  loading.value = true;
  let loaded = swatches.value;
  try {
    const { search, abort } = getColorSwatchesOptimized(s, l)
    if (currentAbort) currentAbort('New search initiated');
    currentAbort = abort;
    loading.value = true;
    loaded = await search();
    loading.value = false;
  } catch (err) {
    console.warn('Fetch aborted:', err);
    // Fallback to previous swatches when aborted
    loaded = swatches.value;
  } finally {
    swatches.value = loaded;
  }
}, 400)

watch([s, l], () => fetchSwatches(s.value, l.value))
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
