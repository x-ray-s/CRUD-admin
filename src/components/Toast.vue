<template>
    <div
        class="alert alert-error shadow-lg absolute z-10 inset-x-1/2 w-1/5 top-5"
        style="transform: translateX(-50%)"
        v-show="store.isShow"
    >
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{{ store.text }}</span>
        </div>
    </div>
</template>
<script>
import { useToastStore } from '@/stores/toast'
export default {
    setup() {
        const store = useToastStore()
        return {
            store,
        }
    },
}
</script>
