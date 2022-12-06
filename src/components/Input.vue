<template>
    <div v-if="field.component === 'upload'" class="w-full">
        <input
            type="file"
            class="file-input file-input-bordered w-full"
            @change="$emit('update:model', $event.target.files[0])"
        />
        <Preview :file="value"></Preview>
    </div>

    <div class="h-52 mb-10" v-else-if="field.component === 'quill'">
        <QuillEditor v-model:content="value" theme="snow" />
    </div>
    <div class="flex h-52 w-full" v-else-if="field.type === 'Json'">
        <VueJSONEditor mode="text" :content="value" :onChange="quillChange" />
    </div>
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
        class="input input-bordered w-full"
        v-model="value"
    />
    <div v-else-if="field.kind === 'enum'" class="w-full">
        <select
            class="select select-bordered w-full"
            @:change="$emit('update:model', $event.target.value)"
            :value="value"
        >
            <option v-for="option in enumValue" :key="option.name">
                {{ option.name }}
            </option>
        </select>
    </div>
    <input
        v-else
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full"
        v-model="value"
    />
</template>
<script>
import VueJSONEditor from '@/components/VueJSONEditor.vue'
import Preview from '@/components/Preview.vue'
import { format } from 'date-fns'
export default {
    props: ['field', 'model', 'enumValue'],
    components: {
        VueJSONEditor,
        Preview,
    },
    emits: ['update:model'],

    computed: {
        value: {
            get() {
                if (this.field.component === 'quill') {
                    return JSON.parse(this.model)
                } else if (this.field.type === 'Json') {
                    return {
                        json: this.model,
                    }
                } else if (this.field.type === 'DateTime') {
                    return format(
                        this.model ? new Date(this.model) : new Date(),
                        "yyyy-MM-dd'T'HH:mm:ss"
                    )
                } else {
                    return this.model
                }
            },
            set(value) {
                let v = value
                if (this.field.component === 'quill') {
                    v = JSON.stringify(value)
                } else if (this.field.type === 'DateTime') {
                    console.log(v)
                    v = new Date(value).valueOf()
                }
                this.$emit('update:model', v)
            },
        },
    },
    methods: {
        quillChange(v) {
            try {
                this.$emit('update:model', JSON.parse(v.text))
            } catch (e) {}
        },
    },
}
</script>
