<template>
    <div class="h-52 mb-10 w-full">
        <QuillEditor v-model:content="bindContent" theme="snow" />
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
export default {
    components: {
        QuillEditor,
    },
    emits: ['update:modelValue'],
    computed: {
        bindContent: {
            get() {
                return JSON.parse(this.$attrs.modelValue)
            },
            set(v) {
                this.$emit('update:modelValue', JSON.stringify(v))
            },
        },
    },
}
</script>
