<template>
    <div class="flex h-52 w-full">
        <VueJSONEditor :content="content" :onChange="onChange" />
    </div>
</template>
<script>
import VueJSONEditor from '@/components/VueJSONEditor.vue'
export default {
    components: {
        VueJSONEditor,
    },
    emits: ['update:modelValue'],
    computed: {
        content() {
            return {
                json: this.$attrs.modelValue,
            }
        },
    },
    methods: {
        onChange: function (content) {
            const { text, json } = content
            if (text) {
                try {
                    this.$emit('update:modelValue', JSON.parse(text))
                } catch (e) {}
            } else {
                this.$emit('update:modelValue', json)
            }
        },
    },
}
</script>
