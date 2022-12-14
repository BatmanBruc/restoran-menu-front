<template>
<div class="clearfix">
    <a-upload :maxCount="1" :customRequest="handleUpload" listType="none" :showUploadList="false">
    <a-button>
        <upload-outlined></upload-outlined>
        Загрузить фото
    </a-button>
    </a-upload>
</div>
<img v-if="src_image" :style="{ maxWidth: '100%', marginTop: '10px' }" :src="'http://127.0.0.1:3000/pics/' + src_image" />
</template>
<script lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { defineComponent, ref, toRef, watch } from 'vue';
import type { UploadProps } from 'ant-design-vue';
import { Api } from '../../services/Api';

export default defineComponent({
components: {
    UploadOutlined,
},
props: {
    src: { type: String, default: '' }
},
setup(props, { emit }) {
    const api = new Api()
    const store = useStore()
    const uploading = ref<boolean>(false);
    const fileList = ref<UploadProps['fileList']>([]);
    const prop_src_image = toRef(props, 'src')
    watch(prop_src_image, ()=>{
        src_image.value = prop_src_image.value
    })
    const src_image = ref(props.src)
    const handleUpload = async (data: any) => {
        const formData = new FormData();
        formData.append('image', data.file);
        uploading.value = true;

        // You can use any AJAX library you like
        api.post('/upload_image', formData).then((response) => {
            src_image.value = response.data.content.src
            emit('upload', response.data.content.id)
        })
        .catch((err) => {
            console.log(err)
        });
        return 
    };

    return {
        uploading,
        handleUpload,
        fileList,
        src_image
    };
},
});
</script>