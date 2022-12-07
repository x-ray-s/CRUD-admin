<template>
    <input v-bind="attrs" @input="onChange" />
</template>
<script>
import { format } from 'date-fns'
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    computed: {
        attrs() {
            let value = this.$attrs.modelValue
            switch (this.type) {
                case 'Boolean':
                    return {
                        type: 'checkbox',
                        class: 'checkbox',
                        checked: value,
                    }
                case 'DateTime':
                    return {
                        type: 'datetime-local',
                        step: 1,
                        class: 'input input-bordered w-full',
                        value: format(
                            value ? new Date(value) : new Date(),
                            "yyyy-MM-dd'T'HH:mm:ss"
                        ),
                    }
            }
            return {
                type: 'text',
                class: 'input input-bordered w-full',
                value: value,
            }
        },
    },
    methods: {
        onChange(e) {
            let value = e.target.value
            switch (this.type) {
                case 'Boolean':
                    value = e.target.checked
                    break
                case 'DateTime':
                    value = new Date(value).valueOf()
                    break
            }
            this.$emit('update:modelValue', value)
        },
    },
}
</script>
