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
                <UploadImage :src="image_src" @upload="uploadImage"/>
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
import { ProductsActionTypes } from '../../store/products/action-types'
import { CategoriesActionTypes } from '../../store/categories/action-types'
import { ProductsMutationTypes } from '../../store/products/mutation-types'
import type { Product } from '../../store/products/types'
import UploadImage from './UploadImage.vue';
import { Api } from '../../services/Api';


export default {
    name: "ChangeProduct",
    components: {
        EditOutlined,
        UploadImage
    },
    props: {
        id: { type: Number, default: ()=>null }
    },
    setup(props){
        const api = new Api()
        const store = useStore()

        const visible = ref<boolean>(false)
        const show = ()=>{
            formState.value.title = ''
            formState.value.category_id = null
            formState.value.image_id = null
            image_src.value = ''
            store.commit(ProductsMutationTypes.SET_PRODUCT_ID, props.id)
            store.dispatch(ProductsActionTypes.GET_PRODUCT, props.id)
            store.dispatch(CategoriesActionTypes.GET_CATEGORIES)
            visible.value = true;
        }
        const item = computed<Product>(()=>store.state.products.item)
        watch(item, ()=>{
            if(item.value){
                formState.value.title = item.value.title
                formState.value.category_id = item.value.category_id
                formState.value.image_id = item.value.image_id
                image_src.value = item.value.image ? item.value.image.src : ''
            }
        })
        const loading_item = computed<boolean>(()=>store.state.categories.loading_item)
        const image_src = ref('')
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
            api.post('/product/' + props.id, formState.value).then((response)=>{
                Api.showSuccess(response)
                store.dispatch(ProductsActionTypes.GET_PRODUCTS)
                loading.value = false
                visible.value = false
            }, (error)=>{
                Api.showEror(error)
                loading.value = false
            })
        }
        const onClose = ()=>{
            store.commit(ProductsMutationTypes.REMOVE_PRODUCT)
        }
        const uploadImage = (id: number)=>{
            formState.value.image_id = id
        }

        return {
            visible,
            show,
            formState,
            loading,
            image_src,
            uploadImage,
            onSubmit,
            onClose,
            loading_item,
            categories,
            item
        }
    }
}
</script>
<style scoped>
</style>
   