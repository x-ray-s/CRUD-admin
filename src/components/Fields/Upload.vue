<template>
    <div class="w-full">
        <input
            type="file"
            class="file-input file-input-bordered w-full"
            @change="onChange"
        />
        <Preview :file="file" :preview="$attrs.modelValue"></Preview>
    </div>
</template>
<script>
import Preview from './Preview.vue'
export default {
    components: {
        Preview,
    },
    data() {
        return {
            file: null,
        }
    },
    methods: {
        onChange(e) {
            this.file = e.target.files[0]
            this.$emit('update:modelValue', e.target.files[0])
        },
    },
}
</script>
