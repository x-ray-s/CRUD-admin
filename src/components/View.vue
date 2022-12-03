<template>
    <img v-if="value" class="w-24" :src="url" alt="" />
</template>
<script>
export default {
    props: ['value'],

    computed: {
        url() {
            return 'http://localhost:4000' + this.value
        },
    },
}
</script>
