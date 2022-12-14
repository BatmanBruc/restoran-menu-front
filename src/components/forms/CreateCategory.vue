<template>
    <a-button type="primary" :style="{ marginBottom: '10px' }" @click="show">Добавить</a-button>
    <a-drawer
        v-model:visible="visible"
        class="custom-class"
        style="color: red"
        title="Создание категории"
        placement="right"
    >
        <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onSubmit"
        >
            <a-form-item has-feedback placeholder="Название" name="title" :rules="[{ required: true, message: 'Введите название!' }]">
                <a-input type="text" placeholder="Название" v-model:value="formState.title" autocomplete="off" />
            </a-form-item>
            <a-form-item >
                <a-button v-if="!loading" type="primary" class="login-button"  html-type="submit">Создать</a-button>
                <a-button v-else type="primary" class="login-button" loading></a-button>
            </a-form-item>
        </a-form>
    </a-drawer>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import type { TablePaginationConfig, TableColumnType } from 'ant-design-vue';
import { CategoriesActionTypes } from '../../store/categories/action-types'
import type { Category } from '../../store/categories/types'
import { Api } from './../../services/Api';


export default {
    name: "CreateCategory",
    setup(){
        const api = new Api()
        const store = useStore()

        const visible = ref<boolean>(false)
        const show = ()=>{
            visible.value = true;
        }
        const formState = ref<Category>({
            title: ''
        })

        const loading = ref<boolean>(false)
        const onSubmit = ()=>{
            loading.value = true
            api.post('/category',formState.value).then((response)=>{
                Api.showSuccess(response)
                store.dispatch(CategoriesActionTypes.GET_CATEGORIES)
                visible.value = false
            }, (error)=>{
                Api.showEror(error)
                loading.value = false
            })
        }

        return {
            visible,
            show,
            formState,
            loading,
            onSubmit
        }
    }
}
</script>
<style scoped>
</style>
   