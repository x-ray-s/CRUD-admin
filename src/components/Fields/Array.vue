<template>
    <div>
        <div
            v-for="(item, index) in $attrs.modelValue"
            :key="index"
            class="flex items-center"
        >
            <Single
                v-model="$attrs.modelValue[index]"
                :field="field"
                class="my-2"
            />
            <button
                class="btn btn-square btn-outline btn-sm ml-3"
                @click="remove(index)"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                /></svg>
            </button>
        </div>
        <div class="flex justify-end mt-3">
            <button
                class="btn btn-primary btn-sm w-1/2"
                @click="add"
            >
                add item
            </button>
        </div>
    </div>
</template>
<script>
import Single from './Single.vue'
export default {
    components: {
        Single
    },
    inheritAttrs: false,
    props: {
        field: {
            type: Object,
            required: true,
        }
    },
    emits: ['update:modelValue'],

    methods: {
        add () {
            this.$attrs.modelValue.push('')
        },
        remove (index) {
            this.$attrs.modelValue.splice(index, 1)
        },
    }
}
</script>