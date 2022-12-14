<template>
    <CreateCategory/>
    <a-table :dataSource="categories" :columns="columns" @change="changePage" :pagination="pagination">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'edit'">
                <ChangeCategory :id="record.id" />
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

import CreateCategory from '../forms/CreateCategory.vue';
import ChangeCategory from '../forms/ChangeCategory.vue';

import { CategoriesActionTypes } from '../../store/categories/action-types'
import type { Category } from '../../store/categories/types'


import { Api } from '../../services/Api';

const api = new Api()

type CategoryColumns = ({ dataIndex: keyof Category, title: string } & TableColumnType) []

export default {
    name: "Categories",
    components:{
        CreateCategory,
        ChangeCategory,
        DeleteOutlined
    },
    setup(){
        const store = useStore()

        const columnsCategory: CategoryColumns = [
            {
                dataIndex: 'id',
                title: 'ID'
            },
            {
                dataIndex: 'title',
                title: 'Наименование'
            }
        ];
        
        const columns: TableColumnType[] = [
            ...columnsCategory,
            {
                key: 'edit',
            },
            {
                key: 'del',
            }
        ];

        const pagination = computed<TablePaginationConfig>(()=>{
            return {
                current: ( store.state.categories.pagination.skip / store.state.categories.pagination.take ) + 1,
                total: store.state.categories.count,
                pageSize: store.state.categories.pagination.take
            }
        })

        store.dispatch(CategoriesActionTypes.GET_CATEGORIES)
        const categories = computed(()=>{
            return store.state.categories.list
        })
        const changePage = (data: TablePaginationConfig)=>{
            console.log(data)
        }
        const deleteItem = (id: number)=>{
            api.delete('/category/' + id).then((response)=>{
                Api.showSuccess(response)
                store.dispatch(CategoriesActionTypes.GET_CATEGORIES)
            }, (error)=>{
                Api.showEror(error)
            })
        }
        return {
            columns,
            categories,
            changePage,
            deleteItem,
            pagination
        }
    }
}
</script>
<style scoped>
</style>
   