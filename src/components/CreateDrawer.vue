<template>
    <div class="drawer-side">
        <label :for="id" class="drawer-overlay"></label>
        <div class="p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <div
                class="form-control w-full max-w-xs"
                v-for="field in store.filterFields"
                :key="field.name"
            >
                <label class="label">
                    <span class="label-text">{{ field.name }}</span>
                    <span class="label-text text-error" v-if="field.isRequired"
                        >*</span
                    >
                </label>
                <input
                    v-if="isUpload(field.name)"
                    type="file"
                    class="file-input file-input-bordered w-full max-w-xs"
                    @change="fileHandler($event, field.name)"
                />
                <input
                    v-else-if="field.type === 'Boolean'"
                    type="checkbox"
                    class="checkbox"
                    v-model="payload[field.name]"
                />
                <input
                    v-else-if="field.type === 'DateTime'"
                    type="datetime-local"
                    step="1"
                    class="input input-bordered w-full max-w-xs"
                    v-on:change="selectHandler($event, field.name)"
                    :value="payload[field.name]"
                />

                <select
                    class="select select-bordered w-full max-w-xs"
                    v-else-if="field.kind === 'enum'"
                    @change="selectHandler($event, field.name)"
                    :value="payload[field.name]"
                >
                    <option
                        v-for="option in field.enumMap.values"
                        :key="option.name"
                    >
                        {{ option.name }}
                    </option>
                </select>
                <input
                    v-else
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                    v-model="payload[field.name]"
                />
            </div>
            <button class="btn mt-3 mr-3" v-on:click="save">save</button>
            <button class="btn mt-3" v-on:click="reset">reset</button>
        </div>
    </div>
</template>
<script>
import { useFieldsStore } from '@/stores/fields'
export default {
    inject: ['Toast'],
    props: ['id'],
    data() {
        return {
            payload: {},
            hasUpload: false,
        }
    },
    setup() {
        const store = useFieldsStore()
        return {
            store,
        }
    },
    created() {
        this.init()
    },

    methods: {
        fileHandler(e, key) {
            this.payload[key] = e.target.files[0]
        },
        isUpload(fieldName) {
            const bool = this.store.config?.property[fieldName]?.upload
            if (bool && !this.hasUpload) {
                this.hasUpload = true
            }
            return bool
        },
        validate() {
            return this.store.filterFields.filter((i) => {
                const value = this.payload[i.name]
                return i.isRequired && !value
            })
        },
        async save() {
            // required field
            if (this.validate().length) {
                this.Toast.show(
                    'The ' + this.validate()[0].name + ' is required'
                )
                return
            }

            await this.store.create(this.payload, this.hasUpload)
            document.querySelector(`#${this.id}`).checked = false
            this.init()
            await this.store.list()
        },
        selectHandler(e, key) {
            this.payload[key] = e.target.value
        },
        init() {
            this.payload = this.store.filterFields.reduce((prev, acc) => {
                // default value
                if (acc.hasDefaultValue) {
                    prev[acc.name] =
                        acc.default.name === 'now'
                            ? new Date().toISOString().replace(/\.\d{3}z/gi, '')
                            : ''
                } else {
                    prev[acc.name] = ''
                }
                return prev
            }, {})
        },
        resetFiles() {
            const inputs = this.$el.querySelectorAll('input[type=file]')
            if (inputs) {
                Array.from(inputs).forEach((el) => {
                    el.value = ''
                })
            }
        },
        reset() {
            this.init()
            this.resetFiles()
        },
    },
}
</script>
