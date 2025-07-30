<template>
  <div class="slider">
    <label class="slider-label">
      <span class="label-text">{{ label }}</span>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @input="updateValue"
      />
    </label>
    <span class="slider-value">{{ modelValue }}{{ unit }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: Number,
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  unit: {
    type: String,
    default: '%',
  },
})

const emit = defineEmits(['update:modelValue'])
function updateValue(e) {
  emit('update:modelValue', Number(e.target.value))
}
</script>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.slider-label {
  font-weight: 500;
  flex-grow: 1;
  display: flex;
}
.label-text {
  width: 100px;
  text-align: left;
}
.slider-value {
  min-width: 40px;
  text-align: right;
}
input[type="range"] {
  margin: 0 8px;
  flex-grow: 1;
}
</style>