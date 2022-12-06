<template>
    <div class="drawer-side">
        <label :for="id" class="drawer-overlay"></label>
        <div class="p-4 overflow-y-auto w-1/4 bg-base-100 text-base-content">
            <div
                class="form-control w-full"
                v-for="field in store.fields"
                :key="field.name"
            >
                <label class="label">
                    <span class="label-text">{{ field.name }}</span>
                    <span
                        class="label-text text-error"
                        v-if="
                            field.isRequired &&
                            !field.hasDefaultValue &&
                            !field.isUpdatedAt
                        "
                        >*</span
                    >
                </label>
                <Input
                    :field="field"
                    :model="store.payload[field.name]"
                    @update:model="
                        (value) => {
                            store.payload[field.name] = value
                        }
                    "
                    :enumValue="store.enums[field.type]"
                />
            </div>
            <button class="btn mt-3 mr-3" v-on:click="save">save</button>
            <button class="btn mt-3" v-on:click="reset">reset</button>
        </div>
    </div>
</template>
<script>
import { useCreateStore } from '@/stores/create'
import { useFieldsStore } from '@/stores/fields'
import Input from '@/components/Input.vue'
import Date from '@/components/Date.vue'

export default {
    components: {
        Input,
        Date,
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
