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
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
        <path
            :fill="color"
            d="M4 21v-9.375L2.2 13L1 11.4L12 3l11 8.4l-1.2 1.575l-1.8-1.35V21zm2-2h12v-8.9l-6-4.575L6 10.1zm0 0h12zm2-4q-.425 0-.712-.288T7 14q0-.425.288-.712T8 13q.425 0 .713.288T9 14q0 .425-.288.713T8 15m4 0q-.425 0-.712-.288T11 14q0-.425.288-.712T12 13q.425 0 .713.288T13 14q0 .425-.288.713T12 15m4 0q-.425 0-.712-.288T15 14q0-.425.288-.712T16 13q.425 0 .713.288T17 14q0 .425-.288.713T16 15"
        />
    </svg>
</template>
