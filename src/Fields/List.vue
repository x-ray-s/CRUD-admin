<template>
    <div>
        <div class="badge">{{ list?.length }}</div>
    </div>
</template>
<script>
export default {
    props: ['list', 'field'],
}
</script>
