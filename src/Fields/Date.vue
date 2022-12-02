<template>
    <div>{{ date }}</div>
</template>
<script>
import { format } from 'date-fns'
export default {
    props: ['value'],
    computed: {
        date() {
            return this.value
                ? format(new Date(this.value), 'yyyy-MM-dd HH:mm:ss')
                : ''
        },
    },
}
</script>
