<template>
    <div>
        <div class="w-1/3 m-auto">
            <div class="form-control w-full my-3">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input
                    type="text"
                    v-model="username"
                    class="input input-bordered w-full"
                />
            </div>
            <div class="form-control w-full my-3">
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input
                    type="password"
                    v-model="password"
                    class="input input-bordered w-full"
                />
            </div>
            <button class="btn" @click="loginHandler">Login</button>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
export default {
    inject: ['Toast'],
    setup() {
        const store = useAuthStore()
        return {
            store,
        }
    },
    data() {
        return {
            password: '',
            username: '',
        }
    },
    methods: {
        async loginHandler() {
            const { error, msg } = await this.store.login(
                this.username,
                this.password
            )
            if (error) {
                this.Toast.show(msg)
                return
            }
            this.$router.replace('/')
        },
    },
}
</script>
