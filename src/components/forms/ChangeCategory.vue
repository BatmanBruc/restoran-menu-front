<template>
    <EditOutlined @click="show"/>
    <a-drawer
        v-model:visible="visible"
        class="custom-class"
        style="color: red"
        title="Редактирование категории"
        placement="right"
        @close="onClose"
    >
        <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onSubmit"
        v-if="!loading_item"
        >
            <a-form-item has-feedback placeholder="Название" name="title" :rules="[{ required: true, message: 'Введите название!' }]">
                <a-input type="text" placeholder="Название" v-model:value="formState.title" autocomplete="off" />
            </a-form-item>
            <a-form-item >
                <a-button v-if="!loading" type="primary" class="login-button" html-type="submit">Изменить</a-button>
                <a-button v-else type="primary" class="login-button" loading></a-button>
            </a-form-item>
        </a-form>
        <div v-else :style="{ textAlign: 'center' }">
            <a-spin />
        </div>
    </a-drawer>
</template>
<script lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import  { EditOutlined } from '@ant-design/icons-vue';
import { CategoriesActionTypes } from '../../store/categories/action-types'
import { CategoriesMutationTypes } from '../../store/categories/mutation-types'
import type { Category } from '../../store/categories/types'
import { Api } from '../../services/Api';

export default {
    name: "CreateCategory",
    components: {
        EditOutlined
    },
    props: {
        id: { type: Number, default: ()=>null }
    },
    setup(props){
        const api = new Api()
        const store = useStore()

        const visible = ref<boolean>(false)
        const show = ()=>{
            store.commit(CategoriesMutationTypes.SET_CATEGORY_ID, props.id)
            store.dispatch(CategoriesActionTypes.GET_CATEGORY, props.id)
            visible.value = true;
        }
        const item = computed<Category>(()=>store.state.categories.item)
        watch(item, ()=>{
            formState.value.title = item.value.title
        })
        const loading_item = computed<boolean>(()=>store.state.categories.loading_item)

        const formState = ref<Category>({
            title: ''
        })
        const loading = ref<boolean>(false)
        const onSubmit = ()=>{
            loading.value = true
            api.post('/category/' + props.id, formState.value).then((response)=>{
                Api.showSuccess(response)
                store.dispatch(CategoriesActionTypes.GET_CATEGORIES)
                loading.value = false
                visible.value = false
            }, (error)=>{
                Api.showEror(error)
                loading.value = false
            })
        }
        const onClose = ()=>{
            store.commit(CategoriesMutationTypes.REMOVE_CATEGORY)
        }

        return {
            visible,
            show,
            formState,
            loading,
            onSubmit,
            onClose,
            loading_item
        }
    }
}
</script>
<style scoped>
</style>
   