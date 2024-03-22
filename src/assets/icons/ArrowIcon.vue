<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 20,
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
    viewBox="0 0 24 24"
  >
    <path
      :fill="color"
      d="M15.187 12L7.47 4.285q-.221-.222-.218-.532q.003-.31.224-.532Q7.698 3 8.009 3q.31 0 .531.221l7.637 7.642q.242.243.354.54q.111.299.111.597t-.111.596q-.112.298-.354.54L8.535 20.78q-.222.221-.53.218q-.307-.003-.528-.224t-.221-.532q0-.31.22-.531z"
    />
  </svg>
</template>
