<template>
    <div class="drawer-side">
        <label
            :for="id"
            class="drawer-overlay"
        />
        <div class="p-4 overflow-y-auto w-1/4 bg-base-100 text-base-content">
            <div
                v-for="field in store.fields"
                :key="field.name"
                class="form-control w-full"
            >
                <label class="label">
                    <span class="label-text">{{ field.name }}</span>
                    <span
                        v-if="
                            field.isRequired &&
                                !field.hasDefaultValue &&
                                !field.isUpdatedAt
                        "
                        class="label-text text-error"
                    >*</span>
                </label>
                <InputByField
                    v-model="store.payload[field.name]"
                    :field="field"
                    :enums="store.enums[field.type]"
                />
            </div>
            <button
                class="btn mt-3 mr-3"
                @click="save"
            >
                save
            </button>
            <button
                class="btn mt-3"
                @click="reset"
            >
                reset
            </button>
        </div>
    </div>
</template>
<script>
import InputByField from '@/components/Fields/index.vue'
import { useCreateStore } from '@/stores/create'
import { useFieldsStore } from '@/stores/fields'

export default {
    components: {
        InputByField,
    },
    inject: ['Toast'],
    props: ['id'],

    setup() {
        const store = useCreateStore()
        const fieldsStore = useFieldsStore()

        return {
            store,
            fieldsStore,
        }
    },
    watch: {
        'store.model'(v) {
            this.store.headers()
        },
    },
    methods: {
        async save() {
            // required field
            if (this.store.validate().length) {
                this.Toast.show(
                    'The ' + this.store.validate()[0].name + ' is required'
                )
                return
            }

            await this.store.create(this.payload)
            document.querySelector(`#${this.id}`).checked = false
            await this.fieldsStore.list()
            this.reset()
        },
        resetFileInputs() {
            const inputs = this.$el.querySelectorAll('input[type=file]')
            if (inputs) {
                Array.from(inputs).forEach((el) => {
                    el.value = ''
                })
            }
        },
        reset() {
            this.store.payload = this.store.init()
            this.resetFileInputs()
        },
    },
}
</script>
