<template>
    <component
        :is="component"
        :type="field.type"
        v-bind="$attrs"
        :enums="enums"
    />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'

import Original from './OriginalInput.vue'
import Upload from './Upload.vue'
import EnumSelect from './EnumSelect.vue'
import JsonEditor from './JsonEditor.vue'
export default {
    components: {
        Upload,
        Original,
        EnumSelect,
        JsonEditor,
    },
    props: {
        field: {
            type: Object,
            required: true,
        },
        enums: {
            type: Array,
        },
    },
    computed: {
        component() {
            if (this.field.component) {
                switch (this.field.component) {
                    case 'upload':
                        return Upload
                    case 'quill':
                        return QuillEditor
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
