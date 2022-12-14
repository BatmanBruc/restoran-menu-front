<template>
    <CreateProduct/>
    <a-table :dataSource="products" :columns="columns" @change="changePage" :pagination="pagination">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'category'">
                {{ record.category.title }}
            </template>
            <template v-if="column.key === 'edit'">
                <ChangeProduct :id="record.id" />
            </template>
            <template v-if="column.key === 'del'">
                <a-popconfirm
                    title="Вы уверены?"
                    @confirm="deleteItem(record.id)"
                >
                    <delete-outlined/>
                </a-popconfirm>
            </template>
      </template>
    </a-table>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import type { TablePaginationConfig, TableColumnType } from 'ant-design-vue';
import  { DeleteOutlined, CheckOutlined } from '@ant-design/icons-vue';

import CreateProduct from '../forms/CreateProduct.vue';
import ChangeProduct  from '../forms/ChangeProduct.vue';

import { ProductsActionTypes } from '../../store/products/action-types'
import type { Product } from '../../store/products/types'


import { Api } from '../../services/Api';

const api = new Api()

type ProductColumns = ({ dataIndex: keyof Product, title: string } & TableColumnType) []

export default {
    name: "Products",
    components:{
        CreateProduct,
        ChangeProduct,
        DeleteOutlined
    },
    setup(){
        const store = useStore()

        const columnsProduct: ProductColumns = [
            {
                dataIndex: 'id',
                title: 'ID'
            },
            {
                dataIndex: 'title',
                title: 'Наименование'
            },
            {
                dataIndex: 'category',
                title: 'Категория',
                key: 'category'
            }
        ];
        
        const columns: TableColumnType[] = [
            ...columnsProduct,
            {
                key: 'edit',
            },
            {
                key: 'del',
            }
        ];

        const pagination = computed<TablePaginationConfig>(()=>{
            return {
                current: ( store.state.products.pagination.skip / store.state.products.pagination.take ) + 1,
                total: store.state.products.count,
                pageSize: store.state.products.pagination.take
            }
        })

        store.dispatch(ProductsActionTypes.GET_PRODUCTS)
        const products = computed(()=>{
            return store.state.products.list
        })
        const changePage = (data: TablePaginationConfig)=>{
            console.log(data)
        }
        const deleteItem = (id: number)=>{
            api.delete('/product/' + id).then((response)=>{
                Api.showSuccess(response)
                store.dispatch(ProductsActionTypes.GET_PRODUCTS)
            }, (error)=>{
                Api.showEror(error)
            })
        }
        return {
            columns,
            products,
            changePage,
            deleteItem,
            pagination
        }
    }
}
</script>
<style scoped>
</style>
   