<template>
  <div class="swatch" :title="swatch.rgb">
    <div class="swatch-color" :style="{
      backgroundColor: swatch.hex
    }"/>
    <div class="swatch-label">
      <span>{{swatch.name}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  swatch: Object
});
</script>

<style scoped>
.swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.swatch-color {
  width: 100px;
  height: 100px;
}
.swatch-label {
  font-size: 14px;
  color: #333;
  position: relative;
  height: 20px;
  span {
    position: absolute;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}
</style>
