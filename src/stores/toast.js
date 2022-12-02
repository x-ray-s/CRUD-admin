import { defineStore } from 'pinia'

let timer = null

export const useToastStore = defineStore('toast', {
    state: () => ({
        text: '',
        isShow: false,
    }),
    actions: {
        show(text) {
            this.text = text
            this.isShow = true
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.isShow = false
                this.text = ''
            }, 3000)
        },
    },
})
