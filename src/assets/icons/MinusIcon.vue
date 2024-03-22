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
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24"><path :fill="color" d="M19 12.998H5v-2h14z"/></svg>
</template>
