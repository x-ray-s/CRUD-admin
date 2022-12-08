<template>
    <div class="w-full">
        <select
            class="select select-bordered w-full"
            :value="$attrs.modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
        >
            <option
                v-for="option in enums"
                :key="option.name"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    props: {
        enums: {
            type: Object,
            required: true,
        },
    },
    emits: ['update:modelValue'],
}
</script>
