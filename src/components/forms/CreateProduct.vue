<template>
    <a-button type="primary" :style="{ marginBottom: '10px' }" @click="show">Добавить</a-button>
    <a-drawer
        v-model:visible="visible"
        class="custom-class"
        style="color: red"
        title="Создание блюда"
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
            <a-form-item has-feedback placeholder="Категория" name="category_id" :rules="[{ required: true, message: 'Выберете категорию!' }]">
                <a-select
                    ref="select"
                    v-model:value="formState.category_id"
                    placeholder="Категория"
                >
                    <a-select-option v-for="category in categories" :value="category.id">{{category.title}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <UploadImage @upload="uploadImage"/>
            </a-form-item>
            <a-form-item >
                <a-button v-if="!loading" type="primary" class="login-button"  html-type="submit">Создать</a-button>
                <a-button v-else type="primary" class="login-button" loading></a-button>
            </a-form-item>
        </a-form>
    </a-drawer>
</template>
<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { CategoriesActionTypes } from '../../store/categories/action-types'
import { ProductsActionTypes } from '../../store/products/action-types'
import type { Product } from '../../store/products/types'
import UploadImage from './UploadImage.vue';
import { Api } from '../../services/Api';

export default {
    name: "CreateProduct",
    components: {
        UploadImage
    },
    setup(){
        const api = new Api()
        const store = useStore()

        const visible = ref<boolean>(false)
        const show = ()=>{
            store.dispatch(CategoriesActionTypes.GET_CATEGORIES)
            visible.value = true;
        }
        const formState = ref<Product>({
            title: '',
            category_id: null,
            image_id: null
        })

        const categories = computed(()=>{
            return store.state.categories.list
        })
        const loading = ref<boolean>(false)
        const onSubmit = ()=>{
            loading.value = true
            api.post('/product',formState.value).then((response)=>{
                Api.showSuccess(response)
                store.dispatch(ProductsActionTypes.GET_PRODUCTS)
                visible.value = false
            }, (error)=>{
                Api.showEror(error)
                loading.value = false
            })
        }
        const uploadImage = (id: number)=>{
            formState.value.image_id = id
        }
        return {
            visible,
            show,
            formState,
            loading,
            onSubmit,
            uploadImage,
            categories
        }
    }
}
</script>
<style scoped>
</style>
   