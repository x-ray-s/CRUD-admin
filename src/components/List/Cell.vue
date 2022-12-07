<template>
    <div>
        <img
            class="w-20"
            :src="display"
            alt=""
            v-if="this.field.component === 'upload'"
        />
        <div v-else>
            {{ display }}
        </div>
    </div>
</template>
<script>
import { format } from 'date-fns'
export default {
    props: ['field', 'value'],
    computed: {
        display() {
            if (!this.value) {
                return ''
            }
            if (this.field.component === 'upload') {
                if (this.value.startsWith('/')) {
                    return 'http://localhost:4000' + this.value
                }
            }
            if (this.field.type === 'DateTime') {
                return format(new Date(this.value), 'yyyy-MM-dd HH:mm:ss')
            }

            return this.value
        },
    },
}
</script>
