<template>
    <div class="btn-group">
        <button
            class="btn"
            :class="{ 'btn-active': i === page.current }"
            v-for="i in page?.total"
            :key="i"
            v-on:click="$emit('change', i)"
        >
            {{ i }}
        </button>
    </div>
</template>
<script>
export default {
    props: ['page'],
}
</script>
