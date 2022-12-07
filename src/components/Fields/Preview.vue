<template>
    <div class="w-1/2 mt-3" v-if="file || preview">
        <img :src="src || resolvePath" alt="" />
        <div class="flex justify-between text-sm mt-2" v-if="file?.name">
            <div>name: {{ file?.name }}</div>
            <div>size: {{ file?.size }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['file', 'preview'],
    data() {
        return {
            filename: '',
            src: '',
        }
    },
    watch: {
        file(v) {
            if (v instanceof File) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.src = reader.result
                }
                reader.readAsDataURL(v)
            }
        },
    },
    computed: {
        resolvePath(v) {
            if (this.preview.startsWith('/')) {
                return 'http://localhost:4000' + this.preview
            }
            return this.preview
        },
    },
}
</script>
