<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 20
  },
  color: {
    typeof: String,
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 256 256"
  >
    <path
      :fill="color"
      d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"
    />
  </svg>
</template>
