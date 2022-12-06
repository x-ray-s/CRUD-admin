<template>
    <div class="w-1/2 mt-3">
        <img :src="src" alt="" />
        <div class="flex justify-between text-sm mt-2" v-if="file?.name">
            <div>name: {{ file?.name }}</div>
            <div>size: {{ file?.size }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['file'],
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
    mounted() {
        if (typeof this.file === 'string') {
            if (this.file.startsWith('/')) {
                this.src = 'http://localhost:4000' + this.file
            } else {
                this.src = this.file
            }
        }
    },
}
</script>
