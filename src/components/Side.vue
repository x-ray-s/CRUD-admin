<template>
    <aside class="bg-base-200 w-80">
        <div class="h-4"></div>
        <ul class="menu menu-compact flex flex-col p-0 px-4">
            <li v-for="item in nav" :key="item.name">
                <router-link
                    class="capitalize"
                    active-class="active"
                    :to="item.path"
                    >{{ item.name }}</router-link
                >
            </li>
        </ul>
        <ul class="menu menu-compact flex flex-col p-0 px-4">
            <li></li>
            <li>
                <a @click.prevent="logout">Logout</a>
            </li>
        </ul>
    </aside>
</template>
<script>
import { useAuthStore } from '@/stores/auth'
export default {
    data() {
        return {
            nav: [],
        }
    },
    setup() {
        const store = useAuthStore()
        return {
            store,
        }
    },
    async mounted() {
        const data = await fetch('http://localhost:4000/admin/_dashboard')
        this.nav = data
    },
    methods: {
        logout() {
            this.store.logout()
            this.$router.replace({
                name: 'Login',
            })
        },
    },
}
</script>
