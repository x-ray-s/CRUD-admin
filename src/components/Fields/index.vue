<template>
    <ArrayField
        v-if="field.isList"
        v-model="$attrs.modelValue"
        :field="field"
    />
    <Single
        v-else
        :field="field"
        :enums="enums"
    />
</template>

<script>
import ArrayField from './Array.vue'
import Single from './Single.vue'

export default {
    components: {
        ArrayField,
        Single
    },
    props: {
        field: {
            type: Object,
            required: true,
        },
        enums: {
            type: Array,
            default() {
                return []
            },
        },
    },
}
</script>
