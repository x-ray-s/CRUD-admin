import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: useLocalStorage('pinia/auth/token', ''),
    }),
    actions: {
        async login(username, password) {
            const { token, error, msg } = await fetch('/admin/_login', {
                method: 'POST',
                data: {
                    password: password,
                    username: username,
                },
                headers: {
                    'content-type': 'application/json',
                },
            })
            if (error) {
                return { error, msg }
            }

            this.token = token
            return {}
        },
        logout() {
            this.token = ''
        },
    },
})
