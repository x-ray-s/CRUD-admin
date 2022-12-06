<template>
    <img
        v-if="value && component === 'upload'"
        class="w-24"
        :src="url"
        alt=""
    />
    <div v-else-if="type === 'Json'">{{ value }}</div>
    <div v-else class="w-full truncate">{{ value }}</div>
</template>
<script>
export default {
    props: ['value', 'component', 'type'],

    computed: {
        url() {
            return 'http://localhost:4000' + this.value
        },
    },
}
</script>
