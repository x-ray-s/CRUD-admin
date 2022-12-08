<template>
    <component
        :is="component"
        :type="field.type"
        v-bind="$attrs"
        :enums="enums"
    />
</template>

<script>
import EnumSelect from './EnumSelect.vue'
import JsonEditor from './JsonEditor.vue'
import Original from './OriginalInput.vue'
import Quill from './Quill.vue'
import Upload from './Upload.vue'
export default {
    components: {
        Upload,
        Original,
        EnumSelect,
        JsonEditor,
        Quill,
    },
    props: {
        field: {
            type: Object,
            required: true,
        },
        enums: {
            type: Array,
            default() {
                return []
            },
        },
    },
    computed: {
        component() {
            if (this.field.component) {
                switch (this.field.component) {
                    case 'upload':
                        return Upload
                    case 'quill':
                        return Quill
                }
            } else if (this.field.kind === 'enum') {
                return EnumSelect
            } else {
                switch (this.field.type) {
                    case 'Json':
                        return JsonEditor
                    default:
                        return Original
                }
            }
            return ''
        },
    },
}
</script>
