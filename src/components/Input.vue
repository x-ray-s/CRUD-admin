<template>
    <input
        v-if="field.component === 'upload'"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        @change="$emit('update:model', $event.target.files[0])"
    />
    <input
        v-else-if="field.type === 'Boolean'"
        type="checkbox"
        class="checkbox"
        v-model="value"
    />
    <input
        v-else-if="field.type === 'DateTime'"
        type="datetime-local"
        step="1"
        class="input input-bordered w-full max-w-xs"
        @:change="$emit('update:model', $event.target.value)"
        :value="value"
    />

    <select
        class="select select-bordered w-full max-w-xs"
        v-else-if="field.kind === 'enum'"
        @:change="$emit('update:model', $event.target.value)"
        :value="value"
    >
        <option v-for="option in enumValue" :key="option.name">
            {{ option.name }}
        </option>
    </select>
    <input
        v-else
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
        v-model="value"
    />
</template>
<script>
export default {
    props: ['field', 'model', 'enumValue'],
    emits: ['update:model'],

    computed: {
        value: {
            get() {
                return this.model
            },
            set(value) {
                this.$emit('update:model', value)
            },
        },
    },
}
</script>
